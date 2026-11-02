import React from 'react'
import { useDashboard } from '#/hooks/use-dashboard'
import { CheckCircle2, Clock, WifiOff, ArrowRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export function SyncTable() {
  const { data } = useDashboard()

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'sincronizado':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 px-2 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            Sincronizado
          </span>
        )
      case 'em execução offline':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60 px-2 py-0.5 rounded-full">
            <WifiOff className="w-3 h-3" />
            Modo Offline
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60 px-2 py-0.5 rounded-full">
            <Clock className="w-3 h-3" />
            {status}
          </span>
        )
    }
  }

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs h-full flex flex-col">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            Sincronização de Alunos
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Status dos pacotes de prova recebidos dos dispositivos dos alunos
          </p>
        </div>

        <Link
          to="/settings"
          className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
        >
          <span>Ver correções</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border bg-muted/30 text-muted-foreground">
              <th className="py-3 px-5 font-medium">Aluno</th>
              <th className="py-3 px-4 font-medium">Matrícula</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-5 font-medium text-right">Última Sincronização</th>
            </tr>
          </thead>
          {/* <tbody className="divide-y divide-border">
            {data.listaSincronizada.map((aluno, idx) => (
              <tr key={idx} className="hover:bg-muted/40 transition-colors">
                <td className="py-3.5 px-5 font-medium text-foreground">
                  {aluno.nomeAnonimizado}
                </td>
                <td className="py-3.5 px-4 text-muted-foreground font-mono">
                  {aluno.matricula}
                </td>
                <td className="py-3.5 px-4">
                  {getStatusBadge(aluno.statusSincronizacao)}
                </td>
                <td className="py-3.5 px-5 text-muted-foreground text-right">
                  {aluno.dataUltimaSincronizacao}
                </td>
              </tr>
            ))}
          </tbody> */}
        </table>
      </div>
    </div>
  )
}

