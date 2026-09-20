import { api } from '#/lib/axios'
import type { MetricasDTO } from '#/types/dashboard'
import { useQuery } from '@tanstack/react-query'

export function useDashboard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['metricas'], // Nome da consulta, usado para cache e refetch
    queryFn: async () => {
      // Onde o axios vai para buscar os dados
      const respose = await api.get<MetricasDTO>('/dashboard/metricas')
      console.log('Data fetched:', respose.data) // Log para depuração
      return respose.data
    },
  })
  return { data, isLoading, isError }
}
