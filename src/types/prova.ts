export interface Prova {
  id: string
  titulo: string
  disciplina: string
  dataCriacao: string
}

export interface QuestaoRequestDTO {
  idQuestao: string
  categoria: string
  disciplina?: string
  dificuldade: string
  enunciado: string
  tipo?: string
  peso?: number
  tags?: string[]
  alternativas: string[]
  alternativaCorreta?: string
}

export interface ProvaRequestDTO {
  titulo: string
  disciplina: string
  categoria?: string
  questoes: QuestaoRequestDTO[]
  dataCriacao?: string
}
