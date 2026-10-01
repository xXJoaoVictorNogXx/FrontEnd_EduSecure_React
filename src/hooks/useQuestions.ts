import { useQuery } from '@tanstack/react-query'
import type { QuestaoFrontEndDTO } from '../types/questoes'
import { api } from '#/lib/axios'

export const useQuestions = () => {
  const { data, isLoading, isError } = useQuery<QuestaoFrontEndDTO[], Error>({
    queryKey: ['questions'],
    queryFn: async () => {
      const response = await api.get<QuestaoFrontEndDTO[]>('/questao/questoes')
      console.log('Data fetched:', response.data)
      return response.data
    },
  })
  return { data, isLoading, isError }
}

