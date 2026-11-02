import { api } from '#/lib/axios'
import type { MetricasDTO } from '#/types/dashboard'
import { useQuery } from '@tanstack/react-query'

export const FALLBACK_METRICAS: MetricasDTO = {
  progresso: {
    concluidas: 42,
    emExecucaoOffline: 18,
    pendentesSincronizacao: 5,
    totalAlunos: 65,
  },
  taxaIntegridade: 98.5,
  mediaGeral: 7.8,
  questoesDisponiveis: 142,
  listaSincronizada: [
    {
      nomeAnonimizado: 'Mariana Costa',
      matricula: '2024-0341',
      statusSincronizacao: 'Sincronizado',
      dataUltimaSincronizacao: '14:32',
    },
    {
      nomeAnonimizado: 'Lucas Fernandes',
      matricula: '2024-0118',
      statusSincronizacao: 'Sincronizado',
      dataUltimaSincronizacao: '14:29',
    },
    {
      nomeAnonimizado: 'Beatriz Lima',
      matricula: '2024-0892',
      statusSincronizacao: 'Em Execução Offline',
      dataUltimaSincronizacao: '14:15',
    },
    {
      nomeAnonimizado: 'Gabriel Rocha',
      matricula: '2024-0544',
      statusSincronizacao: 'Pendente Sync',
      dataUltimaSincronizacao: '14:02',
    },
    {
      nomeAnonimizado: 'Camila Alves',
      matricula: '2024-0720',
      statusSincronizacao: 'Sincronizado',
      dataUltimaSincronizacao: '13:58',
    },
  ],
  feedAlertas: [
    {
      id: 1,
      nivelCriticidade: 'ALTO',
      mensagem: 'Troca de aba ou perda de foco de janela detectada',
      aluno: 'Aluno #2024-0892',
      horario: '14:26',
    },
    {
      id: 2,
      nivelCriticidade: 'MEDIO',
      mensagem: 'Tentativa de colar texto da área de transferência',
      aluno: 'Aluno #2024-0544',
      horario: '14:18',
    },
    {
      id: 3,
      nivelCriticidade: 'BAIXO',
      mensagem: 'Transição automática para execução em modo offline',
      aluno: 'Aluno #2024-0341',
      horario: '14:05',
    },
    {
      id: 4,
      nivelCriticidade: 'BAIXO',
      mensagem: 'Sincronização de respostas concluída com sucesso',
      aluno: 'Aluno #2024-0118',
      horario: '13:55',
    },
  ],
}

export function useDashboard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['metricas'],
    queryFn: async () => {
      try {
        const response = await api.get<MetricasDTO>('/dashboard/metricas')
        return response.data
      } catch (error) {
        console.warn('Backend offline para /dashboard/metricas. Usando métricas simuladas.', error)
        return FALLBACK_METRICAS
      }
    },
  })

  return {
    data: data || FALLBACK_METRICAS,
    isLoading,
    isError,
  }
}
