import React from 'react'
import { useDashboard } from '#/hooks/use-dashboard'
import { Users, ShieldCheck, GraduationCap, Database, ArrowUpRight } from 'lucide-react'

export function SectionCards() {
  const { data } = useDashboard()

  const concluidas = data.progresso.concluidas
  const totalAlunos = data.progresso.totalAlunos
  const percentualConcluido = Math.round((concluidas / (totalAlunos || 1)) * 100)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <div className="bg-card border border-border rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-primary/40 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">
            Alunos em Avaliação
          </span>
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-foreground tabular-nums">
              {concluidas}
            </span>
            <span className="text-xs text-muted-foreground">
              / {totalAlunos} alunos ({percentualConcluido}%)
            </span>
          </div>

          <div className="w-full bg-muted rounded-full h-1.5 mt-2.5 overflow-hidden">
            <div
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${percentualConcluido}%` }}
            />
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
          <span>{data.progresso.emExecucaoOffline} em modo offline</span>
          <span className="text-amber-600 dark:text-amber-400 font-medium">
            {data.progresso.pendentesSincronizacao} pendentes
          </span>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-primary/40 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">
            Taxa de Integridade
          </span>
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-foreground tabular-nums">
              {data.taxaIntegridade}%
            </span>
            <span className="inline-flex items-center text-[11px] font-medium text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              Alta segurança
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Auditoria de trocas de janela e clipboard
          </p>
        </div>

        <div className="mt-3 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
          <span>Pacotes criptografados</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
            100% íntegros
          </span>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-primary/40 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">
            Média Geral das Turmas
          </span>
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <GraduationCap className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-foreground tabular-nums">
              {data.mediaGeral.toFixed(1)}
            </span>
            <span className="text-xs text-muted-foreground">/ 10</span>
            <span className="inline-flex items-center text-[11px] font-medium text-purple-700 bg-purple-50 dark:bg-purple-950/40 dark:text-purple-400 px-2 py-0.5 rounded-full ml-auto">
              Meta: 7.0
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Média ponderada do semestre 2026.1
          </p>
        </div>

        <div className="mt-3 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
          <span>Aproveitamento geral</span>
          <span className="text-foreground font-semibold">+8.5% acima da meta</span>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-primary/40 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">
            Banco de Questões
          </span>
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Database className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-foreground tabular-nums">
              {data.questoesDisponiveis}
            </span>
            <span className="text-xs text-muted-foreground">cadastradas</span>
            <span className="inline-flex items-center text-[11px] font-medium text-amber-700 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400 px-2 py-0.5 rounded-full ml-auto">
              Ativo
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            4 disciplinas cadastradas no repositório
          </p>
        </div>

        <div className="mt-3 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
          <span>AED, BDI, ENG e MAT</span>
          <span className="text-primary font-medium">Prontas p/ prova</span>
        </div>
      </div>
    </div>
  )
}
