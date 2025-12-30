/**
 * @summary
 * Business logic for User entity.
 * Handles registration, profile generation, and validation.
 *
 * @module services/user/userService
 */

import { v4 as uuidv4 } from 'uuid';
import { ServiceError } from '@/utils';
import { userStore } from '@/instances/user';
import { UserCreateRequest, UserEntity, UserRegisterResponse, InitialProfile } from './userTypes';
import { userRegisterSchema } from './userValidation';
import {
  USER_TYPES,
  INTEGRATION_STATUS,
  VERIFICATION_STATUS,
  BMI_CATEGORIES,
  RISK_LEVELS,
  USER_LIMITS,
  RiskLevel,
} from '@/constants/user';

// Helper to generate random token
const generateToken = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

/**
 * Calculates age from birthdate
 */
function calculateAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

/**
 * Calculates BMI
 */
function calculateBMI(weight: number, height: number): number {
  return Number((weight / (height * height)).toFixed(2));
}

/**
 * Determines BMI Category
 */
function getBMICategory(bmi: number) {
  if (bmi < 18.5) return BMI_CATEGORIES.UNDERWEIGHT;
  if (bmi < 25) return BMI_CATEGORIES.NORMAL;
  if (bmi < 30) return BMI_CATEGORIES.OVERWEIGHT;
  if (bmi < 35) return BMI_CATEGORIES.OBESITY_1;
  if (bmi < 40) return BMI_CATEGORIES.OBESITY_2;
  return BMI_CATEGORIES.OBESITY_3;
}

/**
 * Generates Initial Profile
 */
function generateInitialProfile(data: UserCreateRequest, bmi: number, age: number): InitialProfile {
  const category = getBMICategory(bmi);

  // Simplified risk calculation
  let risk: RiskLevel = RISK_LEVELS.LOW;
  if (bmi >= 30 || age > 60 || (data.dadosSaude?.condicoesSaude?.length || 0) > 0) {
    risk = RISK_LEVELS.MEDIUM;
  }
  if (bmi >= 40 || (data.dadosSaude?.condicoesSaude?.length || 0) > 2) {
    risk = RISK_LEVELS.HIGH;
  }

  // Simplified recommendations
  const recommendations = [
    'Mantenha uma dieta equilibrada',
    'Beba pelo menos 2 litros de água por dia',
  ];
  if (data.estiloVida.nivelAtividadeFisica === 'sedentario') {
    recommendations.push('Inicie com caminhadas leves de 30 minutos');
  }

  // Suggested weight goal (aiming for BMI 24.9 or 10% loss)
  const healthyWeight =
    24.9 * (data.dadosAntropometricos.altura * data.dadosAntropometricos.altura);
  const metaPeso = Math.min(data.dadosAntropometricos.pesoAtual * 0.9, healthyWeight);

  return {
    perfilId: generateToken(), // Mock UUID
    categoriaImc: category,
    nivelRisco: risk,
    recomendacoesIniciais: recommendations,
    metaPesoSugerida: Number(metaPeso.toFixed(1)),
  };
}

/**
 * @summary
 * Registers a new user.
 *
 * @function userRegister
 * @module services/user
 *
 * @param {unknown} body - Request body
 * @returns {Promise<UserRegisterResponse>} Registration result
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - Validation failed
 * @throws {ServiceError} CONFLICT (409) - Email already exists
 */
export async function userRegister(body: unknown): Promise<UserRegisterResponse> {
  const validation = userRegisterSchema.safeParse(body);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Validation failed', 400, validation.error.errors);
  }

  const params = validation.data;

  if (userStore.emailExists(params.email)) {
    throw new ServiceError('CONFLICT', 'Este email já está cadastrado', 409);
  }

  const age = calculateAge(params.dataNascimento);
  if (age < USER_LIMITS.MIN_AGE || age > USER_LIMITS.MAX_AGE) {
    throw new ServiceError(
      'VALIDATION_ERROR',
      `Idade deve estar entre ${USER_LIMITS.MIN_AGE} e ${USER_LIMITS.MAX_AGE} anos`,
      400
    );
  }

  const isMinor = age < 18;
  if (isMinor && !params.autorizacaoMenor) {
    throw new ServiceError(
      'VALIDATION_ERROR',
      'Autorização do responsável é obrigatória para menores de 18 anos',
      400
    );
  }

  const bmi = calculateBMI(
    params.dadosAntropometricos.pesoAtual,
    params.dadosAntropometricos.altura
  );
  const initialProfile = generateInitialProfile(params, bmi, age);
  const now = new Date().toISOString();
  const id = userStore.getNextId();

  const newUser: UserEntity = {
    id,
    tipoUsuario: params.tipoUsuario,
    metodoCadastro: params.metodoCadastro,
    idRedeSocial: params.idRedeSocial,
    statusIntegracao: params.idRedeSocial ? INTEGRATION_STATUS.SUCCESS : INTEGRATION_STATUS.PENDING,
    nomeCompleto: params.nomeCompleto,
    email: params.email,
    senha: params.senha, // In real app, hash this!
    dataNascimento: params.dataNascimento,
    genero: params.genero,
    telefone: params.telefone,
    menorIdade: isMinor,
    fotoPerfil: params.fotoPerfil,
    aceiteTermos: params.aceiteTermos,
    aceitePrivacidade: params.aceitePrivacidade,
    dataAceite: now,
    versaoTermos: 'v1.0',
    tokenConfirmacao: generateToken(),
    emailConfirmado: false,
    tentativasEnvioConfirmacao: 0,
    dadosAntropometricos: {
      ...params.dadosAntropometricos,
      imcCalculado: bmi,
    },
    dadosSaude: params.dadosSaude,
    estiloVida: params.estiloVida,
    perfilInicial: initialProfile,
    dataCriacao: now,
    dataModificacao: now,
  };

  // Handle Professional Data
  if (params.tipoUsuario === USER_TYPES.HEALTH_PROFESSIONAL && params.dadosProfissionais) {
    newUser.dadosProfissionais = {
      ...params.dadosProfissionais,
      statusVerificacao: VERIFICATION_STATUS.PENDING,
    };
  }

  // Handle Minor Authorization
  if (isMinor && params.autorizacaoMenor) {
    newUser.autorizacaoMenor = {
      ...params.autorizacaoMenor,
      tokenAutorizacao: generateToken(),
      autorizacaoConfirmada: false,
      tentativasEnvio: 0,
      componenteAtivo: true,
    };
  }

  userStore.add(newUser);

  return {
    id: newUser.id,
    email: newUser.email,
    mensagem: 'Usuário cadastrado com sucesso',
    requerConfirmacaoEmail: true,
    requerAutorizacaoResponsavel: isMinor,
  };
}
