export interface WeightGoal {
  id: number;
  idUsuario: number;
  pesoAtual: number;
  pesoDesejado: number;
  prazoObjetivo: number;
  totalPesoPerder: number;
  metadata: {
    faixaEtaria: 'jovem' | 'adulto' | 'idoso';
    idadeUsuario: number;
  };
  objetivosSecundarios: ObjetivosSecundarios | null;
  motivacaoPrincipal: 'saude' | 'estetica' | 'autoestima' | 'performance' | 'medica';
  motivacaoPessoal: string | null;
  abordagemPreferida: 'dieta' | 'exercicio' | 'combinacao';
  experienciaAnterior: 'primeira_vez' | 'tentativas_anteriores' | 'acompanhamento_profissional';
  marcosAutomaticos: boolean;
  frequenciaMarcos: 'semanal' | 'quinzenal' | 'mensal' | null;
  marcosPersonalizados: MarcoPersonalizado[] | null;
  validacaoAutomatica: ValidacaoAutomatica;
  aprovacaoUsuario: boolean;
  restricoesMedicas: RestricaoMedica[] | null;
  condicoesImpeditivas: string[] | null;
  deficitCaloricodiario: number;
  planoAcaoInicial: PlanoAcaoInicial;
  alertasConfigurados: AlertaConfigurado[];
  frequenciaRevisaoAutomatica: 'semanal' | 'quinzenal' | 'mensal';
  criteriosRevisao: CriteriosRevisao;
  proximaRevisao: string;
  alertasRevisao: AlertaRevisao[];
  preferenciasAlertas: PreferenciasAlertas;
  alertasPersonalizados: AlertaPersonalizado[];
  configuracaoInteligente: boolean;
  historicoInteracoes: HistoricoInteracoes;
  alertasObjetivoPeso: AlertaObjetivoPeso[];
  alertasObjetivosSecundarios: AlertaObjetivoSecundario[];
  alertasMarcosIntermediarios: AlertaMarcoIntermediario[];
  alertasMotivacionais: AlertaMotivacional[];
  ativo: boolean;
  dataCriacao: string;
  dataModificacao: string;
}

export interface ObjetivosSecundarios {
  medidaCinturaAtual?: number;
  medidaCinturaDesejada?: number;
  medidaQuadrilAtual?: number;
  medidaQuadrilDesejada?: number;
  medidaBracoAtual?: number;
  medidaBracoDesejada?: number;
  frequenciaExercicioSemanal?: number;
  consumoAguaDiario?: number;
}

export interface MarcoPersonalizado {
  pesoMeta: number;
  prazoSemanas: number;
  descricao: string;
}

export interface ValidacaoAutomatica {
  status: 'aprovado' | 'alerta' | 'rejeitado';
  alertas: string[];
  sugestoes: Sugestao[];
  scoreSeguranca: number;
}

export interface Sugestao {
  tipo: string;
  valorSugerido: number | string;
  justificativa: string;
}

export interface RestricaoMedica {
  tipo: string;
  severidade: string;
  impactoEmagrecimento: string;
}

export interface PlanoAcaoInicial {
  recomendacoesNutricionais: string[];
  atividadesSugeridas: string[];
  proximosPassos: string[];
  cronogramaSemanal: CronogramaSemanal;
}

export interface CronogramaSemanal {
  semana1: string[];
  semana2: string[];
  semana3: string[];
  semana4: string[];
}

export interface AlertaConfigurado {
  tipo: string;
  frequencia: string;
  horario: string;
  mensagem: string;
  ativo: boolean;
}

export interface CriteriosRevisao {
  desvioPercentualMaximo: number;
  semanasSemProgresso: number;
  aceleracaoMaxima: number;
}

export interface AlertaRevisao {
  tipo: string;
  criterioAtingido: string;
  dataDeteccao: string;
  acaoSugerida: string;
}

export interface PreferenciasAlertas {
  tiposDesejados: string[];
  horariosPreferidos: {
    manha: string;
    tarde: string;
    noite: string;
  };
  frequenciaPersonalizada: Record<string, string>;
  canaisNotificacao: ('push' | 'email' | 'sms')[];
}

export interface AlertaPersonalizado {
  tipo: string;
  horario: string;
  frequencia: string;
  mensagemPersonalizada: string;
  ativo: boolean;
}

export interface HistoricoInteracoes {
  taxaResposta: number;
  horariosMaisEfetivos: string[];
  tiposMaisSeguidos: string[];
}

export interface AlertaObjetivoPeso {
  tipo: string;
  frequencia: string;
  horarioSugerido: string;
  mensagem: string;
  baseadoEm: string;
}

export interface AlertaObjetivoSecundario {
  objetivoRelacionado: string;
  tipoAlerta: string;
  frequencia: string;
  mensagem: string;
}

export interface AlertaMarcoIntermediario {
  marcoId: string;
  dataPrevista: string;
  tipoAlerta: string;
  mensagemMotivacional: string;
}

export interface AlertaMotivacional {
  motivacaoBase: string;
  frequencia: string;
  horario: string;
  mensagem: string;
}

export interface WeightGoalListParams {
  idUsuario: number;
}

export interface ReviseWeightGoalInput {
  motivoRevisao:
    | 'progresso_lento'
    | 'progresso_rapido'
    | 'mudanca_circunstancia'
    | 'problema_saude'
    | 'nova_meta';
  aprovacaoAjustes: boolean;
  ajustesManual?: {
    novoPesoMeta?: number;
    novoPrazo?: number;
  };
}
