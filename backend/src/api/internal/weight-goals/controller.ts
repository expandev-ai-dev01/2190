/**
 * @summary
 * API controller for Weight Goals entity.
 * Thin layer that delegates all logic to service.
 *
 * @module api/internal/weight-goals/controller
 */

import { Request, Response, NextFunction } from 'express';
import { successResponse, errorResponse, isServiceError } from '@/utils';
import {
  weightGoalCreate,
  weightGoalList,
  weightGoalGet,
  weightGoalUpdate,
  weightGoalDelete,
  weightGoalRevise,
} from '@/services/weightGoals';

/**
 * @api {get} /api/internal/weight-goals List Weight Goals
 * @apiName ListWeightGoals
 * @apiGroup WeightGoals
 *
 * @apiQuery {Number} idUsuario User ID
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Object[]} data List of weight goals
 * @apiSuccess {Number} data.id Unique identifier
 * @apiSuccess {Number} data.pesoAtual Current weight in kg
 * @apiSuccess {Number} data.pesoDesejado Target weight in kg
 * @apiSuccess {Number} data.totalPesoPerder Total weight to lose in kg
 * @apiSuccess {Number} data.prazoObjetivo Goal duration in weeks
 * @apiSuccess {Boolean} data.ativo Active status
 * @apiSuccess {String} data.dataCriacao ISO 8601 timestamp
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const idUsuario = parseInt(req.query.idUsuario as string);
    if (!idUsuario || isNaN(idUsuario)) {
      res.status(400).json(errorResponse('idUsuario is required', 'VALIDATION_ERROR'));
      return;
    }

    const data = await weightGoalList(idUsuario);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {post} /api/internal/weight-goals Create Weight Goal
 * @apiName CreateWeightGoal
 * @apiGroup WeightGoals
 *
 * @apiBody {Number} idUsuario User ID
 * @apiBody {Number} pesoAtual Current weight (30-300 kg)
 * @apiBody {Number} pesoDesejado Target weight (30-300 kg, less than current)
 * @apiBody {Number} prazoObjetivo Goal duration (4-104 weeks)
 * @apiBody {Object} [objetivosSecundarios] Optional secondary goals
 * @apiBody {Number} [objetivosSecundarios.medidaCinturaAtual] Current waist measurement
 * @apiBody {Number} [objetivosSecundarios.medidaCinturaDesejada] Target waist measurement
 * @apiBody {String} motivacaoPrincipal Main motivation (saude | estetica | autoestima | performance | medica)
 * @apiBody {String} [motivacaoPessoal] Personal motivation text (max 500 chars)
 * @apiBody {String} abordagemPreferida Preferred approach (dieta | exercicio | combinacao)
 * @apiBody {String} experienciaAnterior Previous experience (primeira_vez | tentativas_anteriores | acompanhamento_profissional)
 * @apiBody {Boolean} marcosAutomaticos Use automatic milestones
 * @apiBody {String} [frequenciaMarcos] Milestone frequency (semanal | quinzenal | mensal)
 * @apiBody {Object[]} [marcosPersonalizados] Custom milestones (max 10)
 * @apiBody {Object} preferenciasAlertas Alert preferences
 * @apiBody {String[]} preferenciasAlertas.tiposDesejados Desired alert types
 * @apiBody {Object} preferenciasAlertas.horariosPreferidos Preferred times
 * @apiBody {String} preferenciasAlertas.horariosPreferidos.manha Morning time (HH:MM)
 * @apiBody {String} preferenciasAlertas.horariosPreferidos.tarde Afternoon time (HH:MM)
 * @apiBody {String} preferenciasAlertas.horariosPreferidos.noite Evening time (HH:MM)
 * @apiBody {Object} preferenciasAlertas.frequenciaPersonalizada Custom frequencies
 * @apiBody {String[]} preferenciasAlertas.canaisNotificacao Notification channels (push | email | sms)
 * @apiBody {Object[]} [alertasPersonalizados] Custom alerts (max 20)
 * @apiBody {Boolean} configuracaoInteligente Enable intelligent configuration
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Number} data.id Unique identifier
 * @apiSuccess {Number} data.idUsuario User ID
 * @apiSuccess {Number} data.pesoAtual Current weight
 * @apiSuccess {Number} data.pesoDesejado Target weight
 * @apiSuccess {Number} data.prazoObjetivo Goal duration in weeks
 * @apiSuccess {Number} data.totalPesoPerder Total weight to lose
 * @apiSuccess {String} data.metadata.faixaEtaria Age bracket (young | adult | senior)
 * @apiSuccess {Number} data.metadata.idadeUsuario User age
 * @apiSuccess {Object|null} data.objetivosSecundarios Secondary goals
 * @apiSuccess {String} data.motivacaoPrincipal Main motivation
 * @apiSuccess {String|null} data.motivacaoPessoal Personal motivation
 * @apiSuccess {String} data.abordagemPreferida Preferred approach
 * @apiSuccess {String} data.experienciaAnterior Previous experience
 * @apiSuccess {Boolean} data.marcosAutomaticos Automatic milestones flag
 * @apiSuccess {String|null} data.frequenciaMarcos Milestone frequency
 * @apiSuccess {Object[]|null} data.marcosPersonalizados Custom milestones
 * @apiSuccess {String} data.validacaoAutomatica.status Validation status (aprovado | alerta | rejeitado)
 * @apiSuccess {String[]} data.validacaoAutomatica.alertas Validation alerts
 * @apiSuccess {Object[]} data.validacaoAutomatica.sugestoes Validation suggestions
 * @apiSuccess {Number} data.validacaoAutomatica.scoreSeguranca Safety score (0-100)
 * @apiSuccess {Boolean} data.aprovacaoUsuario User approval flag
 * @apiSuccess {Object[]|null} data.restricoesMedicas Medical restrictions
 * @apiSuccess {String[]|null} data.condicoesImpeditivas Impeditive conditions
 * @apiSuccess {Number} data.deficitCaloricodiario Daily caloric deficit
 * @apiSuccess {Object} data.planoAcaoInicial Initial action plan
 * @apiSuccess {String[]} data.planoAcaoInicial.recomendacoesNutricionais Nutritional recommendations
 * @apiSuccess {String[]} data.planoAcaoInicial.atividadesSugeridas Suggested activities
 * @apiSuccess {String[]} data.planoAcaoInicial.proximosPassos Next steps
 * @apiSuccess {Object} data.planoAcaoInicial.cronogramaSemanal Weekly schedule
 * @apiSuccess {Object[]} data.alertasConfigurados Configured alerts
 * @apiSuccess {String} data.frequenciaRevisaoAutomatica Automatic review frequency
 * @apiSuccess {Object} data.criteriosRevisao Review criteria
 * @apiSuccess {String} data.proximaRevisao Next review date (ISO 8601)
 * @apiSuccess {Object[]} data.alertasRevisao Review alerts
 * @apiSuccess {Object} data.preferenciasAlertas Alert preferences
 * @apiSuccess {Object[]} data.alertasPersonalizados Personalized alerts
 * @apiSuccess {Boolean} data.configuracaoInteligente Intelligent configuration flag
 * @apiSuccess {Object} data.historicoInteracoes Interaction history
 * @apiSuccess {Object[]} data.alertasObjetivoPeso Weight goal alerts
 * @apiSuccess {Object[]} data.alertasObjetivosSecundarios Secondary goals alerts
 * @apiSuccess {Object[]} data.alertasMarcosIntermediarios Milestone alerts
 * @apiSuccess {Object[]} data.alertasMotivacionais Motivational alerts
 * @apiSuccess {Boolean} data.ativo Active status
 * @apiSuccess {String} data.dataCriacao Creation date (ISO 8601)
 * @apiSuccess {String} data.dataModificacao Modification date (ISO 8601)
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (VALIDATION_ERROR | UNDERAGE | UNSAFE_GOAL)
 * @apiError {String} error.message Error message
 */
export async function createHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await weightGoalCreate(req.body);
    res.status(201).json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {get} /api/internal/weight-goals/:id Get Weight Goal
 * @apiName GetWeightGoal
 * @apiGroup WeightGoals
 *
 * @apiParam {Number} id Weight goal ID
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Object} data Weight goal entity (same structure as create response)
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (NOT_FOUND | VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await weightGoalGet(req.params);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {put} /api/internal/weight-goals/:id Update Weight Goal
 * @apiName UpdateWeightGoal
 * @apiGroup WeightGoals
 *
 * @apiParam {Number} id Weight goal ID
 *
 * @apiBody {Number} [pesoAtual] Current weight (30-300 kg)
 * @apiBody {Number} [pesoDesejado] Target weight (30-300 kg)
 * @apiBody {Number} [prazoObjetivo] Goal duration (4-104 weeks)
 * @apiBody {Object} [objetivosSecundarios] Secondary goals
 * @apiBody {String} [motivacaoPrincipal] Main motivation
 * @apiBody {String} [motivacaoPessoal] Personal motivation
 * @apiBody {String} [abordagemPreferida] Preferred approach
 * @apiBody {Boolean} [marcosAutomaticos] Automatic milestones flag
 * @apiBody {String} [frequenciaMarcos] Milestone frequency
 * @apiBody {Object[]} [marcosPersonalizados] Custom milestones
 * @apiBody {Boolean} [aprovacaoUsuario] User approval
 * @apiBody {Object} [preferenciasAlertas] Alert preferences
 * @apiBody {Object[]} [alertasPersonalizados] Custom alerts
 * @apiBody {Boolean} [configuracaoInteligente] Intelligent configuration
 * @apiBody {Boolean} [ativo] Active status
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Object} data Updated weight goal entity
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (NOT_FOUND | VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function updateHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await weightGoalUpdate(req.params, req.body);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {delete} /api/internal/weight-goals/:id Delete Weight Goal
 * @apiName DeleteWeightGoal
 * @apiGroup WeightGoals
 *
 * @apiParam {Number} id Weight goal ID
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.message Confirmation message
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (NOT_FOUND | VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function deleteHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await weightGoalDelete(req.params);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {post} /api/internal/weight-goals/:id/revise Revise Weight Goal
 * @apiName ReviseWeightGoal
 * @apiGroup WeightGoals
 *
 * @apiParam {Number} id Weight goal ID
 *
 * @apiBody {String} motivoRevisao Revision reason (progresso_lento | progresso_rapido | mudanca_circunstancia | problema_saude | nova_meta)
 * @apiBody {Boolean} aprovacaoAjustes Approve adjustments flag
 * @apiBody {Object} [ajustesManual] Manual adjustments
 * @apiBody {Number} [ajustesManual.novoPesoMeta] New target weight
 * @apiBody {Number} [ajustesManual.novoPrazo] New duration
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Object} data Revised weight goal entity
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (NOT_FOUND | VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function reviseHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await weightGoalRevise(req.params, req.body);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}
