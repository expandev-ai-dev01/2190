/**
 * @summary
 * Type definitions for Weight Goals entity.
 *
 * @module services/weightGoals/weightGoalsTypes
 */

import {
  AgeBracket,
  MotivationOption,
  ApproachOption,
  ExperienceOption,
  MilestoneFrequency,
  ReviewFrequency,
  AlertType,
  RevisionReason,
} from '@/constants/weightGoals';

/**
 * @interface WeightGoalMetadata
 * @description Metadata for weight goal
 */
export interface WeightGoalMetadata {
  faixaEtaria: AgeBracket;
  idadeUsuario: number;
}

/**
 * @interface SecondaryGoals
 * @description Optional secondary goals
 */
export interface SecondaryGoals {
  medidaCinturaAtual?: number;
  medidaCinturaDesejada?: number;
  medidaQuadrilAtual?: number;
  medidaQuadrilDesejada?: number;
  medidaBracoAtual?: number;
  medidaBracoDesejada?: number;
  frequenciaExercicioSemanal?: number;
  consumoAguaDiario?: number;
}

/**
 * @interface CustomMilestone
 * @description Custom milestone structure
 */
export interface CustomMilestone {
  pesoMeta: number;
  prazoSemanas: number;
  descricao: string;
}

/**
 * @interface ValidationResult
 * @description Validation result structure
 */
export interface ValidationResult {
  status: 'aprovado' | 'alerta' | 'rejeitado';
  alertas: string[];
  sugestoes: Array<{
    tipo: string;
    valorSugerido: number;
    justificativa: string;
  }>;
  scoreSeguranca: number;
}

/**
 * @interface MedicalRestriction
 * @description Medical restriction structure
 */
export interface MedicalRestriction {
  tipo: string;
  severidade: string;
  impactoEmagrecimento: string;
}

/**
 * @interface ActionPlan
 * @description Initial action plan structure
 */
export interface ActionPlan {
  recomendacoesNutricionais: string[];
  atividadesSugeridas: string[];
  proximosPassos: string[];
  cronogramaSemanal: {
    semana1: string[];
    semana2: string[];
    semana3: string[];
    semana4: string[];
  };
}

/**
 * @interface ConfiguredAlert
 * @description Configured alert structure
 */
export interface ConfiguredAlert {
  tipo: AlertType;
  frequencia: string;
  horario: string;
  mensagem: string;
  ativo: boolean;
}

/**
 * @interface CurrentProgress
 * @description Current progress structure
 */
export interface CurrentProgress {
  pesoPerdido: number;
  tempoDecorrido: number;
  percentualMeta: number;
  marcosAtingidos: number;
}

/**
 * @interface ProposedAdjustments
 * @description Proposed adjustments structure
 */
export interface ProposedAdjustments {
  novoPesoMeta: number;
  novoPrazo: number;
  justificativa: string;
  impactoPlano: string;
}

/**
 * @interface RevisionHistory
 * @description Revision history entry
 */
export interface RevisionHistory {
  data: string;
  motivo: RevisionReason;
  objetivosAnteriores: any;
  objetivosNovos: any;
}

/**
 * @interface ReviewCriteria
 * @description Review criteria by age bracket
 */
export interface ReviewCriteria {
  desvioPercentualMaximo: number;
  semanasSemProgresso: number;
  aceleracaoMaxima: number;
}

/**
 * @interface ReviewAlert
 * @description Review alert structure
 */
export interface ReviewAlert {
  tipo: 'desvio_lento' | 'desvio_rapido' | 'estagnacao' | 'meta_atingida';
  criterioAtingido: string;
  dataDeteccao: string;
  acaoSugerida: string;
}

/**
 * @interface AlertPreferences
 * @description User alert preferences
 */
export interface AlertPreferences {
  tiposDesejados: AlertType[];
  horariosPreferidos: {
    manha: string;
    tarde: string;
    noite: string;
  };
  frequenciaPersonalizada: Record<string, string>;
  canaisNotificacao: ('push' | 'email' | 'sms')[];
}

/**
 * @interface PersonalizedAlert
 * @description Personalized alert structure
 */
export interface PersonalizedAlert {
  tipo: AlertType;
  horario: string;
  frequencia: string;
  mensagemPersonalizada: string;
  ativo: boolean;
}

/**
 * @interface InteractionHistory
 * @description Interaction history for intelligent optimization
 */
export interface InteractionHistory {
  taxaResposta: number;
  horariosMaisEfetivos: string[];
  tiposMaisSeguidos: AlertType[];
}

/**
 * @interface ObjectiveAlert
 * @description Alert based on objectives
 */
export interface ObjectiveAlert {
  tipo: string;
  frequencia: string;
  horarioSugerido: string;
  mensagem: string;
  baseadoEm: string;
}

/**
 * @interface SecondaryObjectiveAlert
 * @description Alert for secondary objectives
 */
export interface SecondaryObjectiveAlert {
  objetivoRelacionado: string;
  tipoAlerta: string;
  frequencia: string;
  mensagem: string;
}

/**
 * @interface MilestoneAlert
 * @description Alert for milestones
 */
export interface MilestoneAlert {
  marcoId: string;
  dataPrevista: string;
  tipoAlerta: string;
  mensagemMotivacional: string;
}

/**
 * @interface MotivationalAlert
 * @description Motivational alert
 */
export interface MotivationalAlert {
  motivacaoBase: MotivationOption;
  frequencia: string;
  horario: string;
  mensagem: string;
}

/**
 * @interface WeightGoalEntity
 * @description Complete weight goal entity
 */
export interface WeightGoalEntity {
  id: number;
  idUsuario: number;
  pesoAtual: number;
  pesoDesejado: number;
  prazoObjetivo: number;
  totalPesoPerder: number;
  metadata: WeightGoalMetadata;
  objetivosSecundarios: SecondaryGoals | null;
  motivacaoPrincipal: MotivationOption;
  motivacaoPessoal: string | null;
  abordagemPreferida: ApproachOption;
  experienciaAnterior: ExperienceOption;
  marcosAutomaticos: boolean;
  frequenciaMarcos: MilestoneFrequency | null;
  marcosPersonalizados: CustomMilestone[] | null;
  validacaoAutomatica: ValidationResult;
  aprovacaoUsuario: boolean;
  restricoesMedicas: MedicalRestriction[] | null;
  condicoesImpeditivas: string[] | null;
  deficitCaloricodiario: number;
  planoAcaoInicial: ActionPlan;
  alertasConfigurados: ConfiguredAlert[];
  frequenciaRevisaoAutomatica: ReviewFrequency;
  criteriosRevisao: ReviewCriteria;
  proximaRevisao: string;
  alertasRevisao: ReviewAlert[];
  preferenciasAlertas: AlertPreferences;
  alertasPersonalizados: PersonalizedAlert[];
  configuracaoInteligente: boolean;
  historicoInteracoes: InteractionHistory;
  alertasObjetivoPeso: ObjectiveAlert[];
  alertasObjetivosSecundarios: SecondaryObjectiveAlert[];
  alertasMarcosIntermediarios: MilestoneAlert[];
  alertasMotivacionais: MotivationalAlert[];
  ativo: boolean;
  dataCriacao: string;
  dataModificacao: string;
}

/**
 * @interface WeightGoalCreateRequest
 * @description Request for creating weight goal
 */
export interface WeightGoalCreateRequest {
  idUsuario: number;
  pesoAtual: number;
  pesoDesejado: number;
  prazoObjetivo: number;
  objetivosSecundarios?: SecondaryGoals;
  motivacaoPrincipal: MotivationOption;
  motivacaoPessoal?: string;
  abordagemPreferida: ApproachOption;
  experienciaAnterior: ExperienceOption;
  marcosAutomaticos: boolean;
  frequenciaMarcos?: MilestoneFrequency;
  marcosPersonalizados?: CustomMilestone[];
  preferenciasAlertas: AlertPreferences;
  alertasPersonalizados?: PersonalizedAlert[];
  configuracaoInteligente: boolean;
}

/**
 * @interface WeightGoalUpdateRequest
 * @description Request for updating weight goal
 */
export interface WeightGoalUpdateRequest {
  pesoAtual?: number;
  pesoDesejado?: number;
  prazoObjetivo?: number;
  objetivosSecundarios?: SecondaryGoals;
  motivacaoPrincipal?: MotivationOption;
  motivacaoPessoal?: string;
  abordagemPreferida?: ApproachOption;
  marcosAutomaticos?: boolean;
  frequenciaMarcos?: MilestoneFrequency;
  marcosPersonalizados?: CustomMilestone[];
  aprovacaoUsuario?: boolean;
  preferenciasAlertas?: AlertPreferences;
  alertasPersonalizados?: PersonalizedAlert[];
  configuracaoInteligente?: boolean;
  ativo?: boolean;
}

/**
 * @interface WeightGoalRevisionRequest
 * @description Request for goal revision
 */
export interface WeightGoalRevisionRequest {
  motivoRevisao: RevisionReason;
  aprovacaoAjustes: boolean;
  ajustesManual?: {
    novoPesoMeta?: number;
    novoPrazo?: number;
  };
}

/**
 * @interface WeightGoalListResponse
 * @description Response for listing weight goals
 */
export interface WeightGoalListResponse {
  id: number;
  pesoAtual: number;
  pesoDesejado: number;
  totalPesoPerder: number;
  prazoObjetivo: number;
  ativo: boolean;
  dataCriacao: string;
}
