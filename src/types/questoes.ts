export interface OpenTdbQuestaoDTO {
  id: number
  type: string
  difficulty: string
  category: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

export interface OpenTdbResponseWrapperDTO {
  results: OpenTdbQuestaoDTO[]
}

export type CategoriaQuestoes = string

export interface QuestaoFrontEndDTO {
  idQuestao: string
  categoria: CategoriaQuestoes
  dificuldade: string
  enunciado: string
  alternativas: string[]
  alternativaCorreta?: string
  correct_answer?: string
  tipo?: string
  peso?: number
  tags?: string[]
}

export interface CriarQuestaoDTO {
  enunciado: string
  tipo?: string
  disciplina: string
  peso: number
  alternativas: string[]
  alternativaCorreta: string
  dificuldade?: string
  tags?: string[]
}

