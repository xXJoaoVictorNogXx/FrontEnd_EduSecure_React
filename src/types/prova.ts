export interface Prova {
  id: string
  titulo: string
  disciplina: string
  dataCriacao: string
}

export interface QuestaoRequestDTO {
  idQuestao: string
  categoria: string
  dificuldade: string
  enunciado: string
  alternativas: string[]
  alternativaCorreta?: string
}

export interface ProvaRequestDTO {
  titulo: string
  disciplina: string
  questoes: QuestaoRequestDTO[]
  dataCriacao?: string
}
