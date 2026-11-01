import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { QuestaoFrontEndDTO, CriarQuestaoDTO } from '#/types/questoes'
import { fetchQuestions, criarQuestao } from '#/services/questionsService'
import { toast } from 'sonner'

export const useQuestions = () => {
  const { data, isLoading, isError } = useQuery<QuestaoFrontEndDTO[], Error>({
    queryKey: ['questions'],
    queryFn: fetchQuestions,
  })

  return { data, isLoading, isError }
}

export const useCriarQuestao = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CriarQuestaoDTO) => criarQuestao(payload),
    onSuccess: (novaQuestao) => {
      queryClient.setQueryData<QuestaoFrontEndDTO[]>(['questions'], (old = []) => [
        novaQuestao,
        ...old.filter((q) => q.idQuestao !== novaQuestao.idQuestao),
      ])
      queryClient.invalidateQueries({ queryKey: ['questions'] })
      toast.success('Questão criada com sucesso!')
    },
    onError: (error) => {
      console.error('Erro ao salvar questão:', error)
      toast.error('Erro ao conectar com o backend ao criar a questão.')
    },
  })
}

