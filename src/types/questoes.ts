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

export interface QuestaoFrontEndDTO {
  id: number
  categoria: string
  dificuldade: string
  enunciado: string
  alternativas: string[]
}
