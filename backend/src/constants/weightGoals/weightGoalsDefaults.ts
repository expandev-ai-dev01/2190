/**
 * @summary
 * Default values and constants for Weight Goals entity.
 * Provides centralized configuration for weight loss goals, age-based safety limits,
 * and validation thresholds.
 *
 * @module constants/weightGoals/weightGoalsDefaults
 */

/**
 * @interface WeightGoalsDefaultsType
 * @description Default configuration values for weight goals
 *
 * @property {number} MIN_WEIGHT - Minimum allowed weight in kg (30)
 * @property {number} MAX_WEIGHT - Maximum allowed weight in kg (300)
 * @property {number} MIN_WEEKS - Minimum goal duration in weeks (4)
 * @property {number} MAX_WEEKS - Maximum goal duration in weeks (104)
 * @property {number} MIN_WEEKLY_LOSS - Minimum weekly weight loss in kg (0.25)
 * @property {number} DECIMAL_PLACES - Decimal places for weight values (1)
 */
export const WEIGHT_GOALS_DEFAULTS = {
  MIN_WEIGHT: 30,
  MAX_WEIGHT: 300,
  MIN_WEEKS: 4,
  MAX_WEEKS: 104,
  MIN_WEEKLY_LOSS: 0.25,
  DECIMAL_PLACES: 1,
  MIN_AGE: 18,
} as const;

export type WeightGoalsDefaultsType = typeof WEIGHT_GOALS_DEFAULTS;

/**
 * @interface AgeBracketType
 * @description Age bracket definitions for safety validations
 *
 * @property {string} YOUNG - Young adults (18-25)
 * @property {string} ADULT - Adults (26-59)
 * @property {string} SENIOR - Seniors (60+)
 */
export const AGE_BRACKETS = {
  YOUNG: 'young',
  ADULT: 'adult',
  SENIOR: 'senior',
} as const;

export type AgeBracketType = typeof AGE_BRACKETS;
export type AgeBracket = (typeof AGE_BRACKETS)[keyof typeof AGE_BRACKETS];

/**
 * @interface SafetyLimitsType
 * @description Safety limits by age bracket
 *
 * @property {number} MAX_WEEKLY_LOSS - Maximum safe weekly weight loss in kg
 * @property {number} MAX_TOTAL_LOSS_PERCENT - Maximum safe total weight loss as percentage
 * @property {number} MAX_DEVIATION_PERCENT - Maximum allowed deviation from plan
 */
export const SAFETY_LIMITS = {
  [AGE_BRACKETS.YOUNG]: {
    MAX_WEEKLY_LOSS: 1.0,
    MAX_TOTAL_LOSS_PERCENT: 20,
    MAX_DEVIATION_PERCENT: 20,
  },
  [AGE_BRACKETS.ADULT]: {
    MAX_WEEKLY_LOSS: 0.8,
    MAX_TOTAL_LOSS_PERCENT: 15,
    MAX_DEVIATION_PERCENT: 15,
  },
  [AGE_BRACKETS.SENIOR]: {
    MAX_WEEKLY_LOSS: 0.5,
    MAX_TOTAL_LOSS_PERCENT: 10,
    MAX_DEVIATION_PERCENT: 10,
  },
} as const;

export type SafetyLimitsType = typeof SAFETY_LIMITS;

/**
 * @interface MotivationOptionsType
 * @description Available motivation options
 */
export const MOTIVATION_OPTIONS = {
  HEALTH: 'saude',
  AESTHETIC: 'estetica',
  SELF_ESTEEM: 'autoestima',
  PERFORMANCE: 'performance',
  MEDICAL: 'medica',
} as const;

export type MotivationOptionsType = typeof MOTIVATION_OPTIONS;
export type MotivationOption = (typeof MOTIVATION_OPTIONS)[keyof typeof MOTIVATION_OPTIONS];

/**
 * @interface ApproachOptionsType
 * @description Available approach options
 */
export const APPROACH_OPTIONS = {
  DIET: 'dieta',
  EXERCISE: 'exercicio',
  COMBINED: 'combinacao',
} as const;

export type ApproachOptionsType = typeof APPROACH_OPTIONS;
export type ApproachOption = (typeof APPROACH_OPTIONS)[keyof typeof APPROACH_OPTIONS];

/**
 * @interface ExperienceOptionsType
 * @description Available experience options
 */
export const EXPERIENCE_OPTIONS = {
  FIRST_TIME: 'primeira_vez',
  PREVIOUS_ATTEMPTS: 'tentativas_anteriores',
  PROFESSIONAL_GUIDANCE: 'acompanhamento_profissional',
} as const;

export type ExperienceOptionsType = typeof EXPERIENCE_OPTIONS;
export type ExperienceOption = (typeof EXPERIENCE_OPTIONS)[keyof typeof EXPERIENCE_OPTIONS];

/**
 * @interface MilestoneFrequencyType
 * @description Milestone frequency options
 */
export const MILESTONE_FREQUENCY = {
  WEEKLY: 'semanal',
  BIWEEKLY: 'quinzenal',
  MONTHLY: 'mensal',
} as const;

export type MilestoneFrequencyType = typeof MILESTONE_FREQUENCY;
export type MilestoneFrequency = (typeof MILESTONE_FREQUENCY)[keyof typeof MILESTONE_FREQUENCY];

/**
 * @interface ReviewFrequencyType
 * @description Review frequency based on goal duration
 */
export const REVIEW_FREQUENCY = {
  WEEKLY: 'semanal',
  BIWEEKLY: 'quinzenal',
  MONTHLY: 'mensal',
} as const;

export type ReviewFrequencyType = typeof REVIEW_FREQUENCY;
export type ReviewFrequency = (typeof REVIEW_FREQUENCY)[keyof typeof REVIEW_FREQUENCY];

/**
 * @interface MeasurementLimitsType
 * @description Limits for body measurements
 */
export const MEASUREMENT_LIMITS = {
  WAIST: { MIN: 50, MAX: 200, MAX_REDUCTION: 30 },
  HIP: { MIN: 60, MAX: 250, MAX_REDUCTION: 25 },
  ARM: { MIN: 15, MAX: 60, MAX_REDUCTION: 10 },
} as const;

export type MeasurementLimitsType = typeof MEASUREMENT_LIMITS;

/**
 * @interface ActivityLimitsType
 * @description Limits for activity goals
 */
export const ACTIVITY_LIMITS = {
  EXERCISE_FREQUENCY: { MIN: 1, MAX: 7 },
  WATER_INTAKE: { MIN: 1, MAX: 5 },
} as const;

export type ActivityLimitsType = typeof ACTIVITY_LIMITS;

/**
 * @interface AlertTypesType
 * @description Available alert types
 */
export const ALERT_TYPES = {
  WEIGHING: 'pesagem',
  MEASUREMENT: 'medicao',
  EXERCISE: 'exercicio',
  HYDRATION: 'hidratacao',
  MEAL: 'refeicao',
} as const;

export type AlertTypesType = typeof ALERT_TYPES;
export type AlertType = (typeof ALERT_TYPES)[keyof typeof ALERT_TYPES];

/**
 * @interface RevisionReasonsType
 * @description Reasons for goal revision
 */
export const REVISION_REASONS = {
  SLOW_PROGRESS: 'progresso_lento',
  FAST_PROGRESS: 'progresso_rapido',
  CIRCUMSTANCE_CHANGE: 'mudanca_circunstancia',
  HEALTH_ISSUE: 'problema_saude',
  NEW_GOAL: 'nova_meta',
} as const;

export type RevisionReasonsType = typeof REVISION_REASONS;
export type RevisionReason = (typeof REVISION_REASONS)[keyof typeof REVISION_REASONS];
