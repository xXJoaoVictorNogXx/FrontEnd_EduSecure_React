import { SectionCards } from './components/section-cards'
import { ChartBarInteractive } from './components/chart-bar'
import { SyncTable } from './components/sync-table'
import { AuditAlerts } from './components/audit-alerts'
import { Link } from '@tanstack/react-router'
import { Plus, BookOpen } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="w-full flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto bg-muted/20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Dashboard Analítico
            </h1>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 px-2.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Sincronização Ativa
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Visão geral de desempenho das turmas, integridade das avaliações e modo offline — Semestre 2026.1
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Link
            to="/questions"
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-xl border border-border bg-background hover:bg-muted text-foreground transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Banco de Provas</span>
          </Link>
          <Link
            to="/questions/new"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Questão</span>
          </Link>
        </div>
      </div>

      <SectionCards />

      <ChartBarInteractive />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <SyncTable />
        </div>
        <div className="lg:col-span-2">
          <AuditAlerts />
        </div>
      </div>
    </div>
  )
}
