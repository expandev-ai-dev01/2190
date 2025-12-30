import { z } from 'zod';

const motivacoesPrincipais = ['saude', 'estetica', 'autoestima', 'performance', 'medica'] as const;
const abordagensPreferidas = ['dieta', 'exercicio', 'combinacao'] as const;
const experienciasAnteriores = [
  'primeira_vez',
  'tentativas_anteriores',
  'acompanhamento_profissional',
] as const;
const frequenciasMarcos = ['semanal', 'quinzenal', 'mensal'] as const;
const canaisNotificacao = ['push', 'email', 'sms'] as const;

export const objetivosSecundariosSchema = z
  .object({
    medidaCinturaAtual: z
      .number({ message: 'Medida da cintura deve ser um número' })
      .min(50, 'Medida mínima: 50cm')
      .max(200, 'Medida máxima: 200cm')
      .optional(),
    medidaCinturaDesejada: z
      .number({ message: 'Medida desejada deve ser um número' })
      .min(50, 'Medida mínima: 50cm')
      .max(200, 'Medida máxima: 200cm')
      .optional(),
    medidaQuadrilAtual: z
      .number({ message: 'Medida do quadril deve ser um número' })
      .min(60, 'Medida mínima: 60cm')
      .max(250, 'Medida máxima: 250cm')
      .optional(),
    medidaQuadrilDesejada: z
      .number({ message: 'Medida desejada deve ser um número' })
      .min(60, 'Medida mínima: 60cm')
      .max(250, 'Medida máxima: 250cm')
      .optional(),
    medidaBracoAtual: z
      .number({ message: 'Medida do braço deve ser um número' })
      .min(15, 'Medida mínima: 15cm')
      .max(60, 'Medida máxima: 60cm')
      .optional(),
    medidaBracoDesejada: z
      .number({ message: 'Medida desejada deve ser um número' })
      .min(15, 'Medida mínima: 15cm')
      .max(60, 'Medida máxima: 60cm')
      .optional(),
    frequenciaExercicioSemanal: z
      .number({ message: 'Frequência deve ser um número' })
      .min(1, 'Mínimo 1 dia')
      .max(7, 'Máximo 7 dias')
      .int('Deve ser um número inteiro')
      .optional(),
    consumoAguaDiario: z
      .number({ message: 'Consumo deve ser um número' })
      .min(1, 'Mínimo 1 litro')
      .max(5, 'Máximo 5 litros')
      .optional(),
  })
  .refine(
    (data) => {
      if (data.medidaCinturaAtual && data.medidaCinturaDesejada) {
        return data.medidaCinturaDesejada < data.medidaCinturaAtual;
      }
      return true;
    },
    { message: 'Medida desejada deve ser menor que a atual', path: ['medidaCinturaDesejada'] }
  )
  .refine(
    (data) => {
      if (data.medidaQuadrilAtual && data.medidaQuadrilDesejada) {
        return data.medidaQuadrilDesejada < data.medidaQuadrilAtual;
      }
      return true;
    },
    { message: 'Medida desejada deve ser menor que a atual', path: ['medidaQuadrilDesejada'] }
  )
  .refine(
    (data) => {
      if (data.medidaBracoAtual && data.medidaBracoDesejada) {
        return data.medidaBracoDesejada < data.medidaBracoAtual;
      }
      return true;
    },
    { message: 'Medida desejada deve ser menor que a atual', path: ['medidaBracoDesejada'] }
  );

export const motivacoesSchema = z.object({
  motivacaoPrincipal: z.enum(motivacoesPrincipais, {
    message: 'Selecione sua principal motivação',
  }),
  motivacaoPessoal: z.string().max(500, 'Máximo 500 caracteres').optional(),
  abordagemPreferida: z.enum(abordagensPreferidas, {
    message: 'Selecione sua abordagem preferida',
  }),
  experienciaAnterior: z.enum(experienciasAnteriores, {
    message: 'Selecione sua experiência anterior',
  }),
});

const marcoPersonalizadoSchema = z.object({
  pesoMeta: z
    .number({ message: 'Peso meta deve ser um número' })
    .min(30, 'Peso mínimo: 30kg')
    .max(300, 'Peso máximo: 300kg'),
  prazoSemanas: z
    .number({ message: 'Prazo deve ser um número' })
    .min(1, 'Mínimo 1 semana')
    .int('Deve ser um número inteiro'),
  descricao: z
    .string({ message: 'Descrição é obrigatória' })
    .min(1, 'Descrição não pode estar vazia')
    .max(100, 'Máximo 100 caracteres'),
});

export const marcosSchema = z
  .object({
    marcosAutomaticos: z.boolean().default(true),
    frequenciaMarcos: z
      .enum(frequenciasMarcos, {
        message: 'Selecione a frequência dos marcos',
      })
      .optional(),
    marcosPersonalizados: z
      .array(marcoPersonalizadoSchema)
      .max(10, 'Máximo 10 marcos personalizados')
      .optional(),
  })
  .refine(
    (data) => {
      if (data.marcosAutomaticos && !data.frequenciaMarcos) {
        return false;
      }
      return true;
    },
    { message: 'Defina a frequência dos marcos automáticos', path: ['frequenciaMarcos'] }
  );

const alertaPersonalizadoSchema = z.object({
  tipo: z.string({ message: 'Tipo é obrigatório' }).min(1, 'Tipo não pode estar vazio'),
  horario: z
    .string({ message: 'Horário é obrigatório' })
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato inválido (HH:MM)'),
  frequencia: z
    .string({ message: 'Frequência é obrigatória' })
    .min(1, 'Frequência não pode estar vazia'),
  mensagemPersonalizada: z
    .string({ message: 'Mensagem é obrigatória' })
    .min(1, 'Mensagem não pode estar vazia')
    .max(100, 'Máximo 100 caracteres'),
  ativo: z.boolean().default(true),
});

export const preferenciasAlertasSchema = z.object({
  tiposDesejados: z.array(z.string()).min(1, 'Selecione pelo menos um tipo de alerta'),
  horariosPreferidos: z.object({
    manha: z
      .string({ message: 'Horário da manhã é obrigatório' })
      .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato inválido (HH:MM)'),
    tarde: z
      .string({ message: 'Horário da tarde é obrigatório' })
      .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato inválido (HH:MM)'),
    noite: z
      .string({ message: 'Horário da noite é obrigatório' })
      .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato inválido (HH:MM)'),
  }),
  frequenciaPersonalizada: z.record(z.string(), z.string()).default({}),
  canaisNotificacao: z
    .array(z.enum(canaisNotificacao, { message: 'Canal inválido' }))
    .min(1, 'Selecione pelo menos um canal'),
  alertasPersonalizados: z
    .array(alertaPersonalizadoSchema)
    .max(20, 'Máximo 20 alertas personalizados')
    .optional(),
  configuracaoInteligente: z.boolean().default(true),
});

export const weightGoalSchema = z
  .object({
    idUsuario: z
      .number({ message: 'ID do usuário é obrigatório' })
      .int('Deve ser um número inteiro')
      .positive('Deve ser positivo'),
    pesoAtual: z
      .number({ message: 'Peso atual é obrigatório' })
      .min(30, 'Peso mínimo: 30kg')
      .max(300, 'Peso máximo: 300kg'),
    pesoDesejado: z
      .number({ message: 'Peso desejado é obrigatório' })
      .min(30, 'Peso mínimo: 30kg')
      .max(300, 'Peso máximo: 300kg'),
    prazoObjetivo: z
      .number({ message: 'Prazo é obrigatório' })
      .min(4, 'Prazo mínimo: 4 semanas')
      .max(104, 'Prazo máximo: 104 semanas')
      .int('Deve ser um número inteiro'),
    objetivosSecundarios: objetivosSecundariosSchema.optional(),
    motivacaoPrincipal: z.enum(motivacoesPrincipais, {
      message: 'Selecione sua principal motivação',
    }),
    motivacaoPessoal: z.string().max(500, 'Máximo 500 caracteres').optional(),
    abordagemPreferida: z.enum(abordagensPreferidas, {
      message: 'Selecione sua abordagem preferida',
    }),
    experienciaAnterior: z.enum(experienciasAnteriores, {
      message: 'Selecione sua experiência anterior',
    }),
    marcosAutomaticos: z.boolean().default(true),
    frequenciaMarcos: z
      .enum(frequenciasMarcos, {
        message: 'Selecione a frequência dos marcos',
      })
      .optional(),
    marcosPersonalizados: z
      .array(marcoPersonalizadoSchema)
      .max(10, 'Máximo 10 marcos personalizados')
      .optional(),
    preferenciasAlertas: preferenciasAlertasSchema,
    alertasPersonalizados: z
      .array(alertaPersonalizadoSchema)
      .max(20, 'Máximo 20 alertas personalizados')
      .optional(),
    configuracaoInteligente: z.boolean().default(true),
  })
  .refine((data) => data.pesoDesejado < data.pesoAtual, {
    message: 'Peso desejado deve ser menor que o peso atual',
    path: ['pesoDesejado'],
  })
  .refine(
    (data) => {
      if (data.marcosAutomaticos && !data.frequenciaMarcos) {
        return false;
      }
      return true;
    },
    { message: 'Defina a frequência dos marcos automáticos', path: ['frequenciaMarcos'] }
  );
