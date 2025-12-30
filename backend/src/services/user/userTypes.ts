/**
 * @summary
 * Type definitions for User entity and registration.
 *
 * @module services/user/userTypes
 */

import {
  UserType,
  RegistrationMethod,
  Gender,
  ActivityLevel,
  VerificationStatus,
  IntegrationStatus,
  BmiCategory,
  RiskLevel,
} from '@/constants/user';

export interface ProfessionalData {
  numeroRegistro: string;
  conselhoProfissional: string;
  especialidade: string;
  documentoComprobatorio: string; // URL or base64
  statusVerificacao: VerificationStatus;
  observacoesVerificacao?: string;
  dataVerificacao?: string;
  verificadorId?: string;
}

export interface GuardianAuthorization {
  nomeResponsavel: string;
  cpfResponsavel: string;
  emailResponsavel: string;
  tokenAutorizacao: string;
  autorizacaoConfirmada: boolean;
  dataAutorizacao?: string;
  tentativasEnvio: number;
  componenteAtivo: boolean;
}

export interface AnthropometricData {
  pesoAtual: number;
  altura: number;
  medidaCintura?: number;
  medidaQuadril?: number;
  medidaBraco?: number;
  imcCalculado: number;
}

export interface HealthData {
  historicoMedico?: string;
  medicamentosUso?: string;
  alergiasAlimentares?: string;
  restricoesDieteticas?: string[];
  condicoesSaude?: string[];
}

export interface LifestyleData {
  nivelAtividadeFisica: ActivityLevel;
  rotinaTrabalho?: string;
  preferenciasAlimentares?: string[];
  horarioPreferidoExercicio?: string;
}

export interface InitialProfile {
  perfilId: string;
  categoriaImc: BmiCategory;
  nivelRisco: RiskLevel;
  recomendacoesIniciais: string[];
  metaPesoSugerida: number;
}

export interface UserEntity {
  id: number;
  tipoUsuario: UserType;
  metodoCadastro: RegistrationMethod;
  idRedeSocial?: string;
  statusIntegracao: IntegrationStatus;
  nomeCompleto: string;
  email: string;
  senha?: string;
  dataNascimento: string;
  genero: Gender;
  telefone?: string;
  menorIdade: boolean;
  fotoPerfil?: string;
  fotoUrl?: string;
  aceiteTermos: boolean;
  aceitePrivacidade: boolean;
  dataAceite: string;
  versaoTermos: string;
  tokenConfirmacao: string;
  emailConfirmado: boolean;
  dataConfirmacao?: string;
  tentativasEnvioConfirmacao: number;
  dadosProfissionais?: ProfessionalData;
  autorizacaoMenor?: GuardianAuthorization;
  dadosAntropometricos?: AnthropometricData;
  dadosSaude?: HealthData;
  estiloVida?: LifestyleData;
  perfilInicial?: InitialProfile;
  dataCriacao: string;
  dataModificacao: string;
}

export interface UserCreateRequest {
  tipoUsuario: UserType;
  metodoCadastro: RegistrationMethod;
  idRedeSocial?: string;
  nomeCompleto: string;
  email: string;
  senha?: string;
  dataNascimento: string;
  genero: Gender;
  telefone?: string;
  dadosProfissionais?: {
    numeroRegistro: string;
    conselhoProfissional: string;
    especialidade: string;
    documentoComprobatorio: string;
  };
  autorizacaoMenor?: {
    nomeResponsavel: string;
    cpfResponsavel: string;
    emailResponsavel: string;
  };
  dadosAntropometricos: {
    pesoAtual: number;
    altura: number;
    medidaCintura?: number;
    medidaQuadril?: number;
    medidaBraco?: number;
  };
  dadosSaude?: {
    historicoMedico?: string;
    medicamentosUso?: string;
    alergiasAlimentares?: string;
    restricoesDieteticas?: string[];
    condicoesSaude?: string[];
  };
  estiloVida: {
    nivelAtividadeFisica: ActivityLevel;
    rotinaTrabalho?: string;
    preferenciasAlimentares?: string[];
    horarioPreferidoExercicio?: string;
  };
  fotoPerfil?: string;
  aceiteTermos: boolean;
  aceitePrivacidade: boolean;
}

export interface UserRegisterResponse {
  id: number;
  email: string;
  mensagem: string;
  requerConfirmacaoEmail: boolean;
  requerAutorizacaoResponsavel: boolean;
}
