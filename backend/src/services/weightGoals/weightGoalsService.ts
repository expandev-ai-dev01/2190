/**
 * @summary
 * Business logic for Weight Goals entity.
 * Handles CRUD operations and goal management using in-memory storage.
 *
 * @module services/weightGoals/weightGoalsService
 */

import {
  WEIGHT_GOALS_DEFAULTS,
  AGE_BRACKETS,
  SAFETY_LIMITS,
  REVIEW_FREQUENCY,
  AgeBracket,
} from '@/constants/weightGoals';
import { weightGoalsStore } from '@/instances/weightGoals';
import { ServiceError } from '@/utils';
import {
  WeightGoalEntity,
  WeightGoalListResponse,
  WeightGoalCreateRequest,
  WeightGoalUpdateRequest,
  WeightGoalRevisionRequest,
  ValidationResult,
  ActionPlan,
  ConfiguredAlert,
  ReviewCriteria,
  ObjectiveAlert,
  SecondaryObjectiveAlert,
  MilestoneAlert,
  MotivationalAlert,
} from './weightGoalsTypes';
import { createSchema, updateSchema, revisionSchema, paramsSchema } from './weightGoalsValidation';

/**
 * Calculates age bracket from age
 */
function calculateAgeBracket(age: number): AgeBracket {
  if (age >= 18 && age <= 25) return AGE_BRACKETS.YOUNG;
  if (age >= 26 && age <= 59) return AGE_BRACKETS.ADULT;
  return AGE_BRACKETS.SENIOR;
}

/**
 * Validates weight loss safety
 */
function validateWeightLossSafety(
  currentWeight: number,
  targetWeight: number,
  weeks: number,
  ageBracket: AgeBracket
): ValidationResult {
  const totalLoss = currentWeight - targetWeight;
  const weeklyLoss = totalLoss / weeks;
  const lossPercent = (totalLoss / currentWeight) * 100;

  const limits = SAFETY_LIMITS[ageBracket];
  const alertas: string[] = [];
  const sugestoes: Array<{ tipo: string; valorSugerido: number; justificativa: string }> = [];

  let score = 100;

  // Check weekly loss
  if (weeklyLoss > limits.MAX_WEEKLY_LOSS) {
    score -= 30;
    alertas.push('Perda semanal muito agressiva para sua faixa etária');
    const suggestedWeeks = Math.ceil(totalLoss / limits.MAX_WEEKLY_LOSS);
    sugestoes.push({
      tipo: 'prazo',
      valorSugerido: suggestedWeeks,
      justificativa: `Recomendamos ${suggestedWeeks} semanas para perda segura`,
    });
  }

  if (weeklyLoss < WEIGHT_GOALS_DEFAULTS.MIN_WEEKLY_LOSS) {
    score -= 10;
    alertas.push('Perda semanal muito lenta, pode comprometer motivação');
  }

  // Check total loss percentage
  if (lossPercent > limits.MAX_TOTAL_LOSS_PERCENT) {
    score -= 40;
    alertas.push('Perda total excede limite seguro para sua faixa etária');
    const maxSafeLoss = (currentWeight * limits.MAX_TOTAL_LOSS_PERCENT) / 100;
    sugestoes.push({
      tipo: 'peso_meta',
      valorSugerido: currentWeight - maxSafeLoss,
      justificativa: `Perda máxima segura: ${maxSafeLoss.toFixed(1)}kg`,
    });
  }

  let status: 'aprovado' | 'alerta' | 'rejeitado' = 'aprovado';
  if (score < 60) status = 'rejeitado';
  else if (score < 80) status = 'alerta';

  return {
    status,
    alertas,
    sugestoes,
    scoreSeguranca: score,
  };
}

/**
 * Calculates daily caloric deficit
 */
function calculateCaloricDeficit(totalLoss: number, weeks: number, ageBracket: AgeBracket): number {
  const days = weeks * 7;
  const baseDeficit = (totalLoss * 7700) / days;

  // Apply safety factor by age
  const safetyFactor =
    ageBracket === AGE_BRACKETS.SENIOR ? 0.8 : ageBracket === AGE_BRACKETS.ADULT ? 0.9 : 1.0;

  const adjustedDeficit = baseDeficit * safetyFactor;

  // Ensure within safe range
  return Math.max(200, Math.min(1000, Math.round(adjustedDeficit)));
}

/**
 * Generates initial action plan
 */
function generateActionPlan(request: WeightGoalCreateRequest): ActionPlan {
  return {
    recomendacoesNutricionais: [
      'Aumentar consumo de vegetais e proteínas magras',
      'Reduzir carboidratos refinados e açúcares',
      'Manter hidratação adequada',
    ],
    atividadesSugeridas: [
      'Caminhada 30 minutos diários',
      'Exercícios de resistência 2-3x por semana',
      'Alongamentos diários',
    ],
    proximosPassos: [
      'Registrar peso inicial',
      'Definir horários de refeições',
      'Planejar atividades físicas',
    ],
    cronogramaSemanal: {
      semana1: ['Adaptação ao novo plano', 'Registro diário de alimentação'],
      semana2: ['Início de exercícios leves', 'Ajuste de porções'],
      semana3: ['Intensificação gradual', 'Primeira avaliação'],
      semana4: ['Consolidação de hábitos', 'Revisão de progresso'],
    },
  };
}

/**
 * Generates configured alerts
 */
function generateConfiguredAlerts(request: WeightGoalCreateRequest): ConfiguredAlert[] {
  const alerts: ConfiguredAlert[] = [];

  if (request.preferenciasAlertas.tiposDesejados.includes('pesagem')) {
    alerts.push({
      tipo: 'pesagem',
      frequencia: 'semanal',
      horario: request.preferenciasAlertas.horariosPreferidos.manha,
      mensagem: 'Hora de registrar seu peso semanal',
      ativo: true,
    });
  }

  return alerts;
}

/**
 * Calculates review frequency based on goal duration
 */
function calculateReviewFrequency(
  weeks: number
): (typeof REVIEW_FREQUENCY)[keyof typeof REVIEW_FREQUENCY] {
  if (weeks <= 12) return REVIEW_FREQUENCY.WEEKLY;
  if (weeks <= 26) return REVIEW_FREQUENCY.BIWEEKLY;
  return REVIEW_FREQUENCY.MONTHLY;
}

/**
 * Generates review criteria by age bracket
 */
function generateReviewCriteria(ageBracket: AgeBracket): ReviewCriteria {
  const limits = SAFETY_LIMITS[ageBracket];
  return {
    desvioPercentualMaximo: limits.MAX_DEVIATION_PERCENT,
    semanasSemProgresso: 3,
    aceleracaoMaxima: 1.5,
  };
}

/**
 * Generates objective-based alerts
 */
function generateObjectiveAlerts(request: WeightGoalCreateRequest): ObjectiveAlert[] {
  return [
    {
      tipo: 'pesagem_semanal',
      frequencia: 'semanal',
      horarioSugerido: request.preferenciasAlertas.horariosPreferidos.manha,
      mensagem: 'Registre seu peso para acompanhar o progresso',
      baseadoEm: 'meta_principal_peso',
    },
  ];
}

/**
 * @summary
 * Lists all weight goals for a user.
 *
 * @function weightGoalList
 * @module services/weightGoals
 *
 * @param {number} idUsuario - User ID
 * @returns {Promise<WeightGoalListResponse[]>} List of weight goals
 */
export async function weightGoalList(idUsuario: number): Promise<WeightGoalListResponse[]> {
  const goals = weightGoalsStore.getByUser(idUsuario);
  return goals.map((g) => ({
    id: g.id,
    pesoAtual: g.pesoAtual,
    pesoDesejado: g.pesoDesejado,
    totalPesoPerder: g.totalPesoPerder,
    prazoObjetivo: g.prazoObjetivo,
    ativo: g.ativo,
    dataCriacao: g.dataCriacao,
  }));
}

/**
 * @summary
 * Creates a new weight goal with validation.
 *
 * @function weightGoalCreate
 * @module services/weightGoals
 *
 * @param {unknown} body - Request body
 * @returns {Promise<WeightGoalEntity>} Created weight goal
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - Validation failed
 * @throws {ServiceError} PROFILE_NOT_FOUND (404) - User profile not found
 * @throws {ServiceError} UNDERAGE (400) - User under 18 years
 */
export async function weightGoalCreate(body: unknown): Promise<WeightGoalEntity> {
  const validation = createSchema.safeParse(body);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Validation failed', 400, validation.error.errors);
  }

  const params = validation.data;

  // Simulate user profile check (in real app, would integrate with user profile service)
  const userAge = 30; // Mock age - would come from user profile

  if (userAge < WEIGHT_GOALS_DEFAULTS.MIN_AGE) {
    throw new ServiceError(
      'UNDERAGE',
      'Usuário deve ter no mínimo 18 anos para usar a plataforma',
      400
    );
  }

  const ageBracket = calculateAgeBracket(userAge);
  const totalLoss = params.pesoAtual - params.pesoDesejado;

  if (totalLoss <= 0) {
    throw new ServiceError(
      'VALIDATION_ERROR',
      'Peso desejado deve ser menor que o peso atual',
      400
    );
  }

  // Validate safety
  const validationResult = validateWeightLossSafety(
    params.pesoAtual,
    params.pesoDesejado,
    params.prazoObjetivo,
    ageBracket
  );

  if (validationResult.status === 'rejeitado') {
    throw new ServiceError(
      'UNSAFE_GOAL',
      'Objetivo não atende critérios de segurança',
      400,
      validationResult
    );
  }

  const now = new Date().toISOString();
  const id = weightGoalsStore.getNextId();

  const caloricDeficit = calculateCaloricDeficit(totalLoss, params.prazoObjetivo, ageBracket);
  const actionPlan = generateActionPlan(params);
  const configuredAlerts = generateConfiguredAlerts(params);
  const reviewFrequency = calculateReviewFrequency(params.prazoObjetivo);
  const reviewCriteria = generateReviewCriteria(ageBracket);

  const newGoal: WeightGoalEntity = {
    id,
    idUsuario: params.idUsuario,
    pesoAtual: params.pesoAtual,
    pesoDesejado: params.pesoDesejado,
    prazoObjetivo: params.prazoObjetivo,
    totalPesoPerder: totalLoss,
    metadata: {
      faixaEtaria: ageBracket,
      idadeUsuario: userAge,
    },
    objetivosSecundarios: params.objetivosSecundarios || null,
    motivacaoPrincipal: params.motivacaoPrincipal,
    motivacaoPessoal: params.motivacaoPessoal || null,
    abordagemPreferida: params.abordagemPreferida,
    experienciaAnterior: params.experienciaAnterior,
    marcosAutomaticos: params.marcosAutomaticos,
    frequenciaMarcos: params.frequenciaMarcos || null,
    marcosPersonalizados: params.marcosPersonalizados || null,
    validacaoAutomatica: validationResult,
    aprovacaoUsuario: false,
    restricoesMedicas: null,
    condicoesImpeditivas: null,
    deficitCaloricodiario: caloricDeficit,
    planoAcaoInicial: actionPlan,
    alertasConfigurados: configuredAlerts,
    frequenciaRevisaoAutomatica: reviewFrequency,
    criteriosRevisao: reviewCriteria,
    proximaRevisao: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    alertasRevisao: [],
    preferenciasAlertas: params.preferenciasAlertas,
    alertasPersonalizados: params.alertasPersonalizados || [],
    configuracaoInteligente: params.configuracaoInteligente,
    historicoInteracoes: {
      taxaResposta: 0,
      horariosMaisEfetivos: [],
      tiposMaisSeguidos: [],
    },
    alertasObjetivoPeso: generateObjectiveAlerts(params),
    alertasObjetivosSecundarios: [],
    alertasMarcosIntermediarios: [],
    alertasMotivacionais: [],
    ativo: true,
    dataCriacao: now,
    dataModificacao: now,
  };

  weightGoalsStore.add(newGoal);
  return newGoal;
}

/**
 * @summary
 * Retrieves a specific weight goal.
 *
 * @function weightGoalGet
 * @module services/weightGoals
 *
 * @param {unknown} params - Request params
 * @returns {Promise<WeightGoalEntity>} Weight goal entity
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - Invalid ID
 * @throws {ServiceError} NOT_FOUND (404) - Goal not found
 */
export async function weightGoalGet(params: unknown): Promise<WeightGoalEntity> {
  const validation = paramsSchema.safeParse(params);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, validation.error.errors);
  }

  const { id } = validation.data;
  const goal = weightGoalsStore.getById(id);

  if (!goal) {
    throw new ServiceError('NOT_FOUND', 'Weight goal not found', 404);
  }

  return goal;
}

/**
 * @summary
 * Updates an existing weight goal.
 *
 * @function weightGoalUpdate
 * @module services/weightGoals
 *
 * @param {unknown} params - Request params
 * @param {unknown} body - Request body
 * @returns {Promise<WeightGoalEntity>} Updated weight goal
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - Validation failed
 * @throws {ServiceError} NOT_FOUND (404) - Goal not found
 */
export async function weightGoalUpdate(params: unknown, body: unknown): Promise<WeightGoalEntity> {
  const paramsValidation = paramsSchema.safeParse(params);

  if (!paramsValidation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, paramsValidation.error.errors);
  }

  const bodyValidation = updateSchema.safeParse(body);

  if (!bodyValidation.success) {
    throw new ServiceError(
      'VALIDATION_ERROR',
      'Validation failed',
      400,
      bodyValidation.error.errors
    );
  }

  const { id } = paramsValidation.data;
  const existing = weightGoalsStore.getById(id);

  if (!existing) {
    throw new ServiceError('NOT_FOUND', 'Weight goal not found', 404);
  }

  const updateData = bodyValidation.data;

  // Recalculate if weight or timeline changed
  let totalLoss = existing.totalPesoPerder;
  let validationResult = existing.validacaoAutomatica;
  let caloricDeficit = existing.deficitCaloricodiario;

  if (updateData.pesoAtual || updateData.pesoDesejado || updateData.prazoObjetivo) {
    const newPesoAtual = updateData.pesoAtual || existing.pesoAtual;
    const newPesoDesejado = updateData.pesoDesejado || existing.pesoDesejado;
    const newPrazo = updateData.prazoObjetivo || existing.prazoObjetivo;

    totalLoss = newPesoAtual - newPesoDesejado;
    validationResult = validateWeightLossSafety(
      newPesoAtual,
      newPesoDesejado,
      newPrazo,
      existing.metadata.faixaEtaria
    );
    caloricDeficit = calculateCaloricDeficit(totalLoss, newPrazo, existing.metadata.faixaEtaria);
  }

  const updated = weightGoalsStore.update(id, {
    ...updateData,
    totalPesoPerder: totalLoss,
    validacaoAutomatica: validationResult,
    deficitCaloricodiario: caloricDeficit,
    dataModificacao: new Date().toISOString(),
  });

  return updated as WeightGoalEntity;
}

/**
 * @summary
 * Deletes a weight goal.
 *
 * @function weightGoalDelete
 * @module services/weightGoals
 *
 * @param {unknown} params - Request params
 * @returns {Promise<{ message: string }>} Success message
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - Invalid ID
 * @throws {ServiceError} NOT_FOUND (404) - Goal not found
 */
export async function weightGoalDelete(params: unknown): Promise<{ message: string }> {
  const validation = paramsSchema.safeParse(params);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, validation.error.errors);
  }

  const { id } = validation.data;

  if (!weightGoalsStore.exists(id)) {
    throw new ServiceError('NOT_FOUND', 'Weight goal not found', 404);
  }

  weightGoalsStore.delete(id);
  return { message: 'Weight goal deleted successfully' };
}

/**
 * @summary
 * Revises a weight goal based on progress.
 *
 * @function weightGoalRevise
 * @module services/weightGoals
 *
 * @param {unknown} params - Request params
 * @param {unknown} body - Revision request
 * @returns {Promise<WeightGoalEntity>} Revised weight goal
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - Validation failed
 * @throws {ServiceError} NOT_FOUND (404) - Goal not found
 */
export async function weightGoalRevise(params: unknown, body: unknown): Promise<WeightGoalEntity> {
  const paramsValidation = paramsSchema.safeParse(params);

  if (!paramsValidation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, paramsValidation.error.errors);
  }

  const bodyValidation = revisionSchema.safeParse(body);

  if (!bodyValidation.success) {
    throw new ServiceError(
      'VALIDATION_ERROR',
      'Validation failed',
      400,
      bodyValidation.error.errors
    );
  }

  const { id } = paramsValidation.data;
  const existing = weightGoalsStore.getById(id);

  if (!existing) {
    throw new ServiceError('NOT_FOUND', 'Weight goal not found', 404);
  }

  const revisionData = bodyValidation.data;

  // Generate proposed adjustments (simplified)
  const proposedAdjustments = {
    novoPesoMeta: revisionData.ajustesManual?.novoPesoMeta || existing.pesoDesejado,
    novoPrazo: revisionData.ajustesManual?.novoPrazo || existing.prazoObjetivo,
    justificativa: `Revisão devido a: ${revisionData.motivoRevisao}`,
    impactoPlano: 'Plano será ajustado conforme novos parâmetros',
  };

  if (revisionData.aprovacaoAjustes) {
    // Apply adjustments
    const updated = await weightGoalUpdate(
      { id },
      {
        pesoDesejado: proposedAdjustments.novoPesoMeta,
        prazoObjetivo: proposedAdjustments.novoPrazo,
      }
    );

    return updated;
  }

  return existing;
}
