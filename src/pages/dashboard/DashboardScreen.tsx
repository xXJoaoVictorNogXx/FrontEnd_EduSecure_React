import { SectionCards } from '#/pages/dashboard/components/section-cards'
import { ChartBarInteractive } from './components/chart-bar'

export default function Dashboard() {
  return (
    <div className="w-full space-y-4">
      <div className=" flex flex-col gap-4 @container/main:gap-6">
        <header className="">
          <div>
            <h1 className="text-3xl font-bold ">Dashboard Analítico</h1>
            <h2 className="text-sm font-medium text-muted-foreground">
              Visão geral do desempenho — Semestre 2026.1
            </h2>
          </div>
        </header>
        <section className="p-8">
          <div>
            <SectionCards />
          </div>
          <div>
            <ChartBarInteractive />
          </div>
        </section>
      </div>
    </div>
  )
}
