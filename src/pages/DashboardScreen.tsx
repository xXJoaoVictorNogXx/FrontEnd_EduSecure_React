// src/pages/Dashboard.tsx
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { fetchProvas } from '#/services/provas'
import { SectionCards } from '#/components/section-cards'

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
    <div className="flex h-screen ">
      <main className="flex-1 p-8 overflow-auto">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold ">Dashboard Analítico</h1>
            <h2 className="text-sm font-medium text-muted-foreground">
              Visão geral do desempenho — Semestre 2026.1
            </h2>
          </div>
        </header>
        <section>
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
          </div>
        </section>
      </main>
    </div>
  )
}
