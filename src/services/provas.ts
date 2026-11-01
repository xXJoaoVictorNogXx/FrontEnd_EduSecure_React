import type { Prova, ProvaRequestDTO } from '#/types/prova'
import { api } from '#/lib/axios'

export const fetchProvas = async (): Promise<Prova[]> => {
  const response = await api.get('/provas/sincronizadas')
  return response.data
}

export const criarProva = async (payload: ProvaRequestDTO): Promise<Prova> => {
  const response = await api.post('/provas', payload)
  return response.data
}
