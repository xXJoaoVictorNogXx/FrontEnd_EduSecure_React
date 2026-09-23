export interface MetricasDTO {
  progresso: ProgressoTurmaDTO
  taxaIntegridade: number
  mediaGeral: number
  questoesDisponiveis: number
  listaSincronizada: AlunoSyncStatusDTO[]
  feedAlertas: AlertaAuditoriaDTO[]
}

export interface AlunoSyncStatusDTO {
  nomeAnonimizado: string
  matricula: string
  statusSincronizacao: string
  dataUltimaSincronizacao: string
}

export interface AlertaAuditoriaDTO {
  id: number
  nivelCriticidade: string
  mensagem: string
  aluno: string
  horario: string
}

export interface ProgressoTurmaDTO {
  concluidas: number
  emExecucaoOffline: number
  pendentesSincronizacao: number
  totalAlunos: number
}
