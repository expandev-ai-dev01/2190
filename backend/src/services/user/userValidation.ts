/**
 * @summary
 * Validation schemas for User entity.
 * Centralizes all Zod validation logic for the service.
 *
 * @module services/user/userValidation
 */

import { z } from 'zod';
import {
  USER_TYPES,
  REGISTRATION_METHODS,
  GENDERS,
  ACTIVITY_LEVELS,
  USER_LIMITS,
} from '@/constants/user';
import { zEmail, zString, zDateString } from '@/utils/validation';

const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const professionalDataSchema = z.object({
  numeroRegistro: zString.max(20),
  conselhoProfissional: zString,
  especialidade: zString,
  documentoComprobatorio: zString, // Assuming base64 or URL for file
});

export const guardianAuthSchema = z.object({
  nomeResponsavel: zString.max(100),
  cpfResponsavel: zString.regex(cpfRegex, 'CPF inválido'),
  emailResponsavel: zEmail,
});

export const anthropometricSchema = z.object({
  pesoAtual: z.number().min(30).max(300),
  altura: z.number().min(1.2).max(2.5),
  medidaCintura: z.number().min(40).max(200).optional(),
  medidaQuadril: z.number().min(50).max(250).optional(),
  medidaBraco: z.number().min(15).max(60).optional(),
});

export const healthDataSchema = z.object({
  historicoMedico: z.string().max(1000).optional(),
  medicamentosUso: z.string().max(500).optional(),
  alergiasAlimentares: z.string().max(300).optional(),
  restricoesDieteticas: z.array(z.string()).optional(),
  condicoesSaude: z.array(z.string()).optional(),
});

export const lifestyleSchema = z.object({
  nivelAtividadeFisica: z.enum([
    ACTIVITY_LEVELS.SEDENTARY,
    ACTIVITY_LEVELS.LIGHT,
    ACTIVITY_LEVELS.MODERATE,
    ACTIVITY_LEVELS.INTENSE,
    ACTIVITY_LEVELS.VERY_INTENSE,
  ]),
  rotinaTrabalho: z.string().optional(),
  preferenciasAlimentares: z.array(z.string()).optional(),
  horarioPreferidoExercicio: z.string().optional(),
});

export const userRegisterSchema = z
  .object({
    tipoUsuario: z.enum([USER_TYPES.FINAL_USER, USER_TYPES.HEALTH_PROFESSIONAL]),
    metodoCadastro: z.enum([
      REGISTRATION_METHODS.EMAIL,
      REGISTRATION_METHODS.GOOGLE,
      REGISTRATION_METHODS.FACEBOOK,
    ]),
    idRedeSocial: z.string().optional(),
    nomeCompleto: z
      .string()
      .min(1)
      .max(USER_LIMITS.NAME_MAX_LENGTH)
      .refine((val) => val.trim().split(/\s+/).length >= USER_LIMITS.NAME_MIN_WORDS, {
        message: 'Nome deve conter pelo menos 2 palavras',
      }),
    email: zEmail,
    senha: z.string().optional(),
    dataNascimento: zDateString,
    genero: z.enum([GENDERS.MALE, GENDERS.FEMALE, GENDERS.OTHER, GENDERS.PREFER_NOT_TO_SAY]),
    telefone: z.string().regex(phoneRegex, 'Telefone inválido').optional(),
    dadosProfissionais: professionalDataSchema.optional(),
    autorizacaoMenor: guardianAuthSchema.optional(),
    dadosAntropometricos: anthropometricSchema,
    dadosSaude: healthDataSchema.optional(),
    estiloVida: lifestyleSchema,
    fotoPerfil: z.string().optional(),
    aceiteTermos: z.literal(true),
    aceitePrivacidade: z.literal(true),
  })
  .superRefine((data, ctx) => {
    // Password required for email registration
    if (data.metodoCadastro === REGISTRATION_METHODS.EMAIL) {
      if (!data.senha) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Senha é obrigatória para cadastro via email',
          path: ['senha'],
        });
      } else if (!passwordRegex.test(data.senha)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            'Senha deve ter no mínimo 8 caracteres, uma maiúscula, um número e um caractere especial',
          path: ['senha'],
        });
      }
    }

    // Professional data required for health professionals
    if (data.tipoUsuario === USER_TYPES.HEALTH_PROFESSIONAL && !data.dadosProfissionais) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Dados profissionais são obrigatórios para profissionais de saúde',
        path: ['dadosProfissionais'],
      });
    }
  });

export type UserRegisterInput = z.infer<typeof userRegisterSchema>;
