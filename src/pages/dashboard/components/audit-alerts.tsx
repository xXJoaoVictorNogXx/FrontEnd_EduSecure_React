import React from 'react'
import { useDashboard } from '#/hooks/use-dashboard'
import { AlertTriangle, AlertCircle, Info, ShieldAlert } from 'lucide-react'

export function AuditAlerts() {
  const { data } = useDashboard()

  const getAlertIconAndStyle = (nivel: string) => {
    switch (nivel.toUpperCase()) {
      case 'ALTO':
        return {
          icon: <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />,
          badgeClass:
            'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400 border-red-200 dark:border-red-800/60',
          containerClass: 'border-l-red-500',
        }
      case 'MEDIO':
        return {
          icon: <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />,
          badgeClass:
            'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200 dark:border-amber-800/60',
          containerClass: 'border-l-amber-500',
        }
      default:
        return {
          icon: <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />,
          badgeClass:
            'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border-blue-200 dark:border-blue-800/60',
          containerClass: 'border-l-blue-500',
        }
    }
  }

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs h-full flex flex-col">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-primary" />
          <h2 className="text-base font-semibold text-foreground">
            Auditoria & Segurança
          </h2>
        </div>
        <span className="text-[11px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
          Tempo Real
        </span>
      </div>

      <div className="p-4 space-y-3 flex-1 overflow-y-auto">
        {data.feedAlertas.map((alerta) => {
          const style = getAlertIconAndStyle(alerta.nivelCriticidade)

          return (
            <div
              key={alerta.id}
              className={`p-3 rounded-xl border border-border border-l-4 ${style.containerClass} bg-muted/20 hover:bg-muted/40 transition-colors flex items-start gap-3`}
            >
              <div className="mt-0.5">{style.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md border uppercase tracking-wider ${style.badgeClass}`}
                  >
                    {alerta.nivelCriticidade}
                  </span>
                  <span className="text-[11px] text-muted-foreground font-mono">
                    {alerta.horario}
                  </span>
                </div>
                <p className="text-xs font-medium text-foreground mt-1.5 leading-snug">
                  {alerta.mensagem}
                </p>
                <span className="text-[11px] text-muted-foreground mt-1 inline-block">
                  {alerta.aluno}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

