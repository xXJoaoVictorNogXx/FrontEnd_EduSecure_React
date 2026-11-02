export interface AvaliacaoDesempenho {
  avaliacao: string
  sigla: string
  media: number
  aprovacao: number
  participantes: number
}

export const chartAvaliacoesData: AvaliacaoDesempenho[] = [
  { avaliacao: 'Prova 1 - Algoritmos', sigla: 'P1 - AED', media: 7.4, aprovacao: 82, participantes: 65 },
  { avaliacao: 'Prova 1 - Banco de Dados', sigla: 'P1 - BDI', media: 8.1, aprovacao: 89, participantes: 64 },
  { avaliacao: 'Prova 1 - Eng. Software', sigla: 'P1 - ENG', media: 7.9, aprovacao: 85, participantes: 62 },
  { avaliacao: 'Simulado Prático B1', sigla: 'Simulado', media: 6.8, aprovacao: 76, participantes: 65 },
  { avaliacao: 'Prova 2 - Normalização', sigla: 'P2 - BDI', media: 8.4, aprovacao: 91, participantes: 63 },
  { avaliacao: 'Prova 2 - SOLID e POO', sigla: 'P2 - ENG', media: 7.7, aprovacao: 84, participantes: 61 },
]

export const chartConfig = {
  media: {
    label: 'Média da Turma (0 - 10)',
    color: 'var(--color-primary, #2563eb)',
  },
  aprovacao: {
    label: 'Taxa de Aprovação (%)',
    color: '#10b981',
  },
}
