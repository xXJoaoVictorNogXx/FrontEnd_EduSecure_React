// src/pages/Dashboard.tsx
import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'
import { Button } from '@/components/ui/button'
import type { Prova } from '#/types/prova'

const fetchProvas = async (): Promise<Prova[]> => {
  const response = await api.get('/provas/sincronizadas')
  return response.data
}

export default function Dashboard() {
  const {
    data: provas,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['provas-sincronizadas'],
    queryFn: fetchProvas,
  })

  return (
    <div className="flex h-screen bg-slate-50">
      <main className="flex-1 p-8 overflow-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Painel EduSecure
          </h1>
          <Button variant="default">Nova Sincronização</Button>
        </header>

        {isLoading && <p className="text-slate-500">Carregando provas...</p>}

        {isError && (
          <p className="text-red-500">Erro ao buscar dados do servidor.</p>
        )}

        {provas && (
          <div className="grid gap-4 md:grid-cols-3">
            {provas.map((prova) => (
              <div key={prova.id} className="p-4 bg-white rounded-md shadow">
                {prova.titulo}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
