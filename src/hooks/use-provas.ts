import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Prova, ProvaRequestDTO } from '#/types/prova'
import { fetchProvas, criarProva } from '#/services/provas'
import { toast } from 'sonner'

export const useProvas = () => {
  return useQuery<Prova[], Error>({
    queryKey: ['provas'],
    queryFn: fetchProvas,
  })
}

export const useCriarProva = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: ProvaRequestDTO) => criarProva(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['provas'] })
      toast.success('Prova publicada e gravada no banco com sucesso!')
    },
    onError: (error) => {
      console.error('Erro ao publicar prova:', error)
      toast.error('Erro ao conectar com o backend. Verifique se o Docker está ativo.')
    },
  })
}
