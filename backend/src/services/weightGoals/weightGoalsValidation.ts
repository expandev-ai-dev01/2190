/**
 * @summary
 * Validation schemas for Weight Goals entity.
 * Centralizes all Zod validation logic for the service.
 *
 * @module services/weightGoals/weightGoalsValidation
 */

import { z } from 'zod';
import {
  WEIGHT_GOALS_DEFAULTS,
  MOTIVATION_OPTIONS,
  APPROACH_OPTIONS,
  EXPERIENCE_OPTIONS,
  MILESTONE_FREQUENCY,
  MEASUREMENT_LIMITS,
  ACTIVITY_LIMITS,
  ALERT_TYPES,
  REVISION_REASONS,
} from '@/constants/weightGoals';

/**
 * Schema for secondary goals
 */
export const secondaryGoalsSchema = z
  .object({
    medidaCinturaAtual: z
      .number()
      .min(MEASUREMENT_LIMITS.WAIST.MIN)
      .max(MEASUREMENT_LIMITS.WAIST.MAX)
      .optional(),
    medidaCinturaDesejada: z
      .number()
      .min(MEASUREMENT_LIMITS.WAIST.MIN)
      .max(MEASUREMENT_LIMITS.WAIST.MAX)
      .optional(),
    medidaQuadrilAtual: z
      .number()
      .min(MEASUREMENT_LIMITS.HIP.MIN)
      .max(MEASUREMENT_LIMITS.HIP.MAX)
      .optional(),
    medidaQuadrilDesejada: z
      .number()
      .min(MEASUREMENT_LIMITS.HIP.MIN)
      .max(MEASUREMENT_LIMITS.HIP.MAX)
      .optional(),
    medidaBracoAtual: z
      .number()
      .min(MEASUREMENT_LIMITS.ARM.MIN)
      .max(MEASUREMENT_LIMITS.ARM.MAX)
      .optional(),
    medidaBracoDesejada: z
      .number()
      .min(MEASUREMENT_LIMITS.ARM.MIN)
      .max(MEASUREMENT_LIMITS.ARM.MAX)
      .optional(),
    frequenciaExercicioSemanal: z
      .number()
      .int()
      .min(ACTIVITY_LIMITS.EXERCISE_FREQUENCY.MIN)
      .max(ACTIVITY_LIMITS.EXERCISE_FREQUENCY.MAX)
      .optional(),
    consumoAguaDiario: z
      .number()
      .min(ACTIVITY_LIMITS.WATER_INTAKE.MIN)
      .max(ACTIVITY_LIMITS.WATER_INTAKE.MAX)
      .optional(),
  })
  .optional();

/**
 * Schema for custom milestone
 */
export const customMilestoneSchema = z.object({
  pesoMeta: z.number(),
  prazoSemanas: z.number().int().positive(),
  descricao: z.string().max(100),
});

/**
 * Schema for alert preferences
 */
export const alertPreferencesSchema = z.object({
  tiposDesejados: z.array(
    z.enum([
      ALERT_TYPES.WEIGHING,
      ALERT_TYPES.MEASUREMENT,
      ALERT_TYPES.EXERCISE,
      ALERT_TYPES.HYDRATION,
      ALERT_TYPES.MEAL,
    ])
  ),
  horariosPreferidos: z.object({
    manha: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    tarde: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    noite: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  }),
  frequenciaPersonalizada: z.record(z.string()),
  canaisNotificacao: z.array(z.enum(['push', 'email', 'sms'])),
});

/**
 * Schema for personalized alert
 */
export const personalizedAlertSchema = z.object({
  tipo: z.enum([
    ALERT_TYPES.WEIGHING,
    ALERT_TYPES.MEASUREMENT,
    ALERT_TYPES.EXERCISE,
    ALERT_TYPES.HYDRATION,
    ALERT_TYPES.MEAL,
  ]),
  horario: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  frequencia: z.string(),
  mensagemPersonalizada: z.string().max(100),
  ativo: z.boolean(),
});

/**
 * Schema for create request
 */
export const createSchema = z.object({
  idUsuario: z.number().int().positive(),
  pesoAtual: z.number().min(WEIGHT_GOALS_DEFAULTS.MIN_WEIGHT).max(WEIGHT_GOALS_DEFAULTS.MAX_WEIGHT),
  pesoDesejado: z
    .number()
    .min(WEIGHT_GOALS_DEFAULTS.MIN_WEIGHT)
    .max(WEIGHT_GOALS_DEFAULTS.MAX_WEIGHT),
  prazoObjetivo: z
    .number()
    .int()
    .min(WEIGHT_GOALS_DEFAULTS.MIN_WEEKS)
    .max(WEIGHT_GOALS_DEFAULTS.MAX_WEEKS),
  objetivosSecundarios: secondaryGoalsSchema,
  motivacaoPrincipal: z.enum([
    MOTIVATION_OPTIONS.HEALTH,
    MOTIVATION_OPTIONS.AESTHETIC,
    MOTIVATION_OPTIONS.SELF_ESTEEM,
    MOTIVATION_OPTIONS.PERFORMANCE,
    MOTIVATION_OPTIONS.MEDICAL,
  ]),
  motivacaoPessoal: z.string().max(500).optional(),
  abordagemPreferida: z.enum([
    APPROACH_OPTIONS.DIET,
    APPROACH_OPTIONS.EXERCISE,
    APPROACH_OPTIONS.COMBINED,
  ]),
  experienciaAnterior: z.enum([
    EXPERIENCE_OPTIONS.FIRST_TIME,
    EXPERIENCE_OPTIONS.PREVIOUS_ATTEMPTS,
    EXPERIENCE_OPTIONS.PROFESSIONAL_GUIDANCE,
  ]),
  marcosAutomaticos: z.boolean(),
  frequenciaMarcos: z
    .enum([MILESTONE_FREQUENCY.WEEKLY, MILESTONE_FREQUENCY.BIWEEKLY, MILESTONE_FREQUENCY.MONTHLY])
    .optional(),
  marcosPersonalizados: z.array(customMilestoneSchema).max(10).optional(),
  preferenciasAlertas: alertPreferencesSchema,
  alertasPersonalizados: z.array(personalizedAlertSchema).max(20).optional(),
  configuracaoInteligente: z.boolean(),
});

/**
 * Schema for update request
 */
export const updateSchema = z.object({
  pesoAtual: z
    .number()
    .min(WEIGHT_GOALS_DEFAULTS.MIN_WEIGHT)
    .max(WEIGHT_GOALS_DEFAULTS.MAX_WEIGHT)
    .optional(),
  pesoDesejado: z
    .number()
    .min(WEIGHT_GOALS_DEFAULTS.MIN_WEIGHT)
    .max(WEIGHT_GOALS_DEFAULTS.MAX_WEIGHT)
    .optional(),
  prazoObjetivo: z
    .number()
    .int()
    .min(WEIGHT_GOALS_DEFAULTS.MIN_WEEKS)
    .max(WEIGHT_GOALS_DEFAULTS.MAX_WEEKS)
    .optional(),
  objetivosSecundarios: secondaryGoalsSchema,
  motivacaoPrincipal: z
    .enum([
      MOTIVATION_OPTIONS.HEALTH,
      MOTIVATION_OPTIONS.AESTHETIC,
      MOTIVATION_OPTIONS.SELF_ESTEEM,
      MOTIVATION_OPTIONS.PERFORMANCE,
      MOTIVATION_OPTIONS.MEDICAL,
    ])
    .optional(),
  motivacaoPessoal: z.string().max(500).optional(),
  abordagemPreferida: z
    .enum([APPROACH_OPTIONS.DIET, APPROACH_OPTIONS.EXERCISE, APPROACH_OPTIONS.COMBINED])
    .optional(),
  marcosAutomaticos: z.boolean().optional(),
  frequenciaMarcos: z
    .enum([MILESTONE_FREQUENCY.WEEKLY, MILESTONE_FREQUENCY.BIWEEKLY, MILESTONE_FREQUENCY.MONTHLY])
    .optional(),
  marcosPersonalizados: z.array(customMilestoneSchema).max(10).optional(),
  aprovacaoUsuario: z.boolean().optional(),
  preferenciasAlertas: alertPreferencesSchema.optional(),
  alertasPersonalizados: z.array(personalizedAlertSchema).max(20).optional(),
  configuracaoInteligente: z.boolean().optional(),
  ativo: z.boolean().optional(),
});

/**
 * Schema for revision request
 */
export const revisionSchema = z.object({
  motivoRevisao: z.enum([
    REVISION_REASONS.SLOW_PROGRESS,
    REVISION_REASONS.FAST_PROGRESS,
    REVISION_REASONS.CIRCUMSTANCE_CHANGE,
    REVISION_REASONS.HEALTH_ISSUE,
    REVISION_REASONS.NEW_GOAL,
  ]),
  aprovacaoAjustes: z.boolean(),
  ajustesManual: z
    .object({
      novoPesoMeta: z.number().optional(),
      novoPrazo: z.number().int().positive().optional(),
    })
    .optional(),
});

/**
 * Schema for ID parameter
 */
export const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

/**
 * Inferred types from schemas
 */
export type CreateInput = z.infer<typeof createSchema>;
export type UpdateInput = z.infer<typeof updateSchema>;
export type RevisionInput = z.infer<typeof revisionSchema>;
export type ParamsInput = z.infer<typeof paramsSchema>;
