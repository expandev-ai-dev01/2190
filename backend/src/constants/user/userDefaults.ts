/**
 * @summary
 * Default values and constants for User entity.
 * Provides centralized configuration for user types, registration methods,
 * and validation enums.
 *
 * @module constants/user/userDefaults
 */

export const USER_TYPES = {
  FINAL_USER: 'usuario_final',
  HEALTH_PROFESSIONAL: 'profissional_saude',
} as const;

export type UserType = (typeof USER_TYPES)[keyof typeof USER_TYPES];

export const REGISTRATION_METHODS = {
  EMAIL: 'email',
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
} as const;

export type RegistrationMethod = (typeof REGISTRATION_METHODS)[keyof typeof REGISTRATION_METHODS];

export const GENDERS = {
  MALE: 'masculino',
  FEMALE: 'feminino',
  OTHER: 'outro',
  PREFER_NOT_TO_SAY: 'prefiro_nao_informar',
} as const;

export type Gender = (typeof GENDERS)[keyof typeof GENDERS];

export const ACTIVITY_LEVELS = {
  SEDENTARY: 'sedentario',
  LIGHT: 'leve',
  MODERATE: 'moderado',
  INTENSE: 'intenso',
  VERY_INTENSE: 'muito_intenso',
} as const;

export type ActivityLevel = (typeof ACTIVITY_LEVELS)[keyof typeof ACTIVITY_LEVELS];

export const BMI_CATEGORIES = {
  UNDERWEIGHT: 'abaixo_peso',
  NORMAL: 'normal',
  OVERWEIGHT: 'sobrepeso',
  OBESITY_1: 'obesidade_1',
  OBESITY_2: 'obesidade_2',
  OBESITY_3: 'obesidade_3',
} as const;

export type BmiCategory = (typeof BMI_CATEGORIES)[keyof typeof BMI_CATEGORIES];

export const RISK_LEVELS = {
  LOW: 'baixo',
  MEDIUM: 'medio',
  HIGH: 'alto',
} as const;

export type RiskLevel = (typeof RISK_LEVELS)[keyof typeof RISK_LEVELS];

export const VERIFICATION_STATUS = {
  PENDING: 'pendente',
  IN_ANALYSIS: 'em_analise',
  APPROVED: 'aprovado',
  REJECTED: 'rejeitado',
} as const;

export type VerificationStatus = (typeof VERIFICATION_STATUS)[keyof typeof VERIFICATION_STATUS];

export const INTEGRATION_STATUS = {
  SUCCESS: 'sucesso',
  FAILURE: 'falha',
  PENDING: 'pendente',
} as const;

export type IntegrationStatus = (typeof INTEGRATION_STATUS)[keyof typeof INTEGRATION_STATUS];

export const USER_LIMITS = {
  MIN_AGE: 16,
  MAX_AGE: 100,
  NAME_MIN_WORDS: 2,
  NAME_MAX_LENGTH: 100,
  EMAIL_MAX_LENGTH: 255,
  PASSWORD_MIN_LENGTH: 8,
} as const;
