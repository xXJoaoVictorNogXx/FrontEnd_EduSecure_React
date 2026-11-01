import { api } from '#/lib/axios'
import type { QuestaoFrontEndDTO, CriarQuestaoDTO } from '#/types/questoes'

export const FALLBACK_QUESTIONS: QuestaoFrontEndDTO[] = [
  {
    idQuestao: '1',
    categoria: 'AED-301',
    dificuldade: 'Médio',
    enunciado: 'Qual é a complexidade de tempo do quicksort no caso médio?',
    alternativas: [],
  },
  {
    idQuestao: '2',
    categoria: 'AED-301',
    dificuldade: 'Fácil',
    enunciado: 'Uma estrutura LIFO é característica de qual estrutura de dados?',
    alternativas: [],
  },
  {
    idQuestao: '3',
    categoria: 'AED-301',
    dificuldade: 'Difícil',
    enunciado: 'Descreva o comportamento de uma árvore AVL durante a inserção desequilibrada.',
    alternativas: [],
  },
  {
    idQuestao: '4',
    categoria: 'ENG-204',
    dificuldade: 'Médio',
    enunciado: 'Explique os princípios SOLID e como aplicá-los em projetos orientados a objetos.',
    alternativas: [],
  },
  {
    idQuestao: '5',
    categoria: 'BDI-102',
    dificuldade: 'Fácil',
    enunciado: 'O que significa normalização em banco de dados relacionais?',
    alternativas: [],
  },
  {
    idQuestao: '6',
    categoria: 'BDI-102',
    dificuldade: 'Médio',
    enunciado: 'Qual é a diferença entre PRIMARY KEY e UNIQUE KEY no SQL?',
    alternativas: [],
  },
  {
    idQuestao: '7',
    categoria: 'MAT-101',
    dificuldade: 'Difícil',
    enunciado: 'Calcule o limite de f(x) = (x² - 1)/(x - 1) quando x -> 1.',
    alternativas: [],
  },
  {
    idQuestao: '8',
    categoria: 'AED-301',
    dificuldade: 'Médio',
    enunciado: 'Em qual ordem um percurso em-ordem (inorder) visita os nós de uma BST?',
    alternativas: [],
  },
]

export const fetchQuestions = async (): Promise<QuestaoFrontEndDTO[]> => {
  try {
    const response = await api.get<QuestaoFrontEndDTO[]>('/questao/questoes')
    if (response.data.length > 0) {
      return response.data
    }
    return FALLBACK_QUESTIONS
  } catch (error) {
    console.warn('Backend offline ou endpoint /questao/questoes indisponível. Usando dados mockados.', error)
    return FALLBACK_QUESTIONS
  }
}


export const criarQuestao = async (payload: CriarQuestaoDTO): Promise<QuestaoFrontEndDTO> => {
  try {
    const response = await api.post<QuestaoFrontEndDTO>('/questao', payload)
    return response.data
  } catch (error) {
    console.warn('Backend offline ou endpoint POST /questao indisponível. Simulando criação localmente.', error)
    const novaQuestao: QuestaoFrontEndDTO = {
      idQuestao: String(Date.now()),
      categoria: payload.disciplina,
      dificuldade: payload.dificuldade || 'Médio',
      enunciado: payload.enunciado,
      alternativas: payload.alternativas,
      alternativaCorreta: payload.alternativaCorreta,
      tipo: payload.tipo || 'Múltipla Escolha',
      peso: payload.peso,
      tags: payload.tags || ['#NovaQuestão'],
    }
    FALLBACK_QUESTIONS.unshift(novaQuestao)
    return novaQuestao
  }
}

