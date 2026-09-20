import type { Prova } from '#/types/prova'
import { api } from '#/lib/axios'

export const fetchProvas = async (): Promise<Prova[]> => {
  const response = await api.get('/provas/sincronizadas')
  return response.data
}
