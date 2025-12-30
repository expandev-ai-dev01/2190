import { z } from 'zod';
import { differenceInYears, parseISO } from 'date-fns';

const userTypes = ['usuario_final', 'profissional_saude'] as const;
const registrationMethods = ['email', 'google', 'facebook'] as const;
const genders = ['masculino', 'feminino', 'outro', 'prefiro_nao_informar'] as const;
const activityLevels = ['sedentario', 'leve', 'moderado', 'intenso', 'muito_intenso'] as const;

export const registerSchema = z
  .object({
    // FC-001: Seleção de Tipo de Usuário
    tipoUsuario: z.enum(userTypes, { message: 'Selecione o tipo de usuário' }),

    // FC-002: Opções de Cadastro
    metodoCadastro: z.enum(registrationMethods, { message: 'Selecione o método de cadastro' }),

    // FC-003: Dados Pessoais Básicos
    nomeCompleto: z
      .string({ message: 'Nome completo é obrigatório' })
      .min(5, 'Nome deve ter pelo menos 5 caracteres')
      .max(100, 'Nome muito longo')
      .regex(/^[^\s]+\s+[^\s]+.*$/, 'Digite seu nome completo (nome e sobrenome)'),
    email: z.string({ message: 'E-mail é obrigatório' }).email('E-mail inválido'),
    senha: z.string().optional(),
    dataNascimento: z.string({ message: 'Data de nascimento é obrigatória' }),
    genero: z.enum(genders, { message: 'Selecione o gênero' }),
    telefone: z.string().optional(),

    // FC-004: Autorização para Menores (Campos condicionais)
    nomeResponsavel: z.string().optional(),
    cpfResponsavel: z.string().optional(),
    emailResponsavel: z.string().email('E-mail do responsável inválido').optional(),

    // FC-005: Dados Profissionais (Campos condicionais)
    numeroRegistro: z.string().optional(),
    conselhoProfissional: z.string().optional(),
    especialidade: z.string().optional(),
    // documentoComprobatorio será tratado separadamente no upload ou como File object se suportado

    // FC-007: Dados Antropométricos
    pesoAtual: z.number({ message: 'Peso é obrigatório' }).min(30).max(300),
    altura: z.number({ message: 'Altura é obrigatória' }).min(1.2).max(2.5),
    medidaCintura: z.number().optional(),
    medidaQuadril: z.number().optional(),
    medidaBraco: z.number().optional(),

    // FC-008: Informações de Saúde
    historicoMedico: z.string().max(1000).optional(),
    medicamentosUso: z.string().max(500).optional(),
    alergiasAlimentares: z.string().max(300).optional(),
    restricoesDieteticas: z.array(z.string()).optional(),
    condicoesSaude: z.array(z.string()).optional(),

    // FC-009: Estilo de Vida
    nivelAtividadeFisica: z.enum(activityLevels, {
      message: 'Selecione o nível de atividade física',
    }),
    rotinaTrabalho: z.string().optional(),
    preferenciasAlimentares: z.array(z.string()).optional(),
    horarioPreferidoExercicio: z.string().optional(),

    // FC-011: Termos
    aceiteTermos: z.boolean().refine((val) => val === true, 'Você deve aceitar os termos de uso'),
    aceitePrivacidade: z
      .boolean()
      .refine((val) => val === true, 'Você deve aceitar a política de privacidade'),
  })
  .superRefine((data, ctx) => {
    // Validação de Senha para cadastro via E-mail
    if (data.metodoCadastro === 'email') {
      if (!data.senha || data.senha.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Senha deve ter no mínimo 8 caracteres',
          path: ['senha'],
        });
      }
    }

    // Validação de Menor de Idade
    if (data.dataNascimento) {
      const age = differenceInYears(new Date(), parseISO(data.dataNascimento));
      if (age < 18) {
        if (!data.nomeResponsavel) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Nome do responsável é obrigatório para menores de 18 anos',
            path: ['nomeResponsavel'],
          });
        }
        if (!data.cpfResponsavel) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'CPF do responsável é obrigatório para menores de 18 anos',
            path: ['cpfResponsavel'],
          });
        }
        if (!data.emailResponsavel) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'E-mail do responsável é obrigatório para menores de 18 anos',
            path: ['emailResponsavel'],
          });
        }
      }
    }

    // Validação de Profissional de Saúde
    if (data.tipoUsuario === 'profissional_saude') {
      if (!data.numeroRegistro) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Número de registro é obrigatório para profissionais',
          path: ['numeroRegistro'],
        });
      }
      if (!data.conselhoProfissional) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Conselho profissional é obrigatório',
          path: ['conselhoProfissional'],
        });
      }
      if (!data.especialidade) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Especialidade é obrigatória',
          path: ['especialidade'],
        });
      }
    }
  });
