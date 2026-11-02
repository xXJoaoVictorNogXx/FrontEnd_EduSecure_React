import React, { useState } from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { chartAvaliacoesData, chartConfig } from '#/constants/chart'

export function ChartBarInteractive() {
  const [activeMetric, setActiveMetric] = useState<'media' | 'aprovacao'>('media')

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs">
      <div className="p-5 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            Desempenho por Avaliação
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Acompanhamento das notas e taxas de aprovação nas provas aplicadas
          </p>
        </div>

        <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-xl self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveMetric('media')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${activeMetric === 'media'
                ? 'bg-background text-foreground shadow-2xs font-semibold'
                : 'text-muted-foreground hover:text-foreground'
              }`}
          >
            Média da Turma (0 - 10)
          </button>
          <button
            type="button"
            onClick={() => setActiveMetric('aprovacao')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${activeMetric === 'aprovacao'
                ? 'bg-background text-foreground shadow-2xs font-semibold'
                : 'text-muted-foreground hover:text-foreground'
              }`}
          >
            Taxa de Aprovação (%)
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartAvaliacoesData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="currentColor"
                className="text-border/60"
              />
              <XAxis
                dataKey="sigla"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                className="text-muted-foreground fill-muted-foreground"
              />
              <YAxis
                domain={activeMetric === 'media' ? [0, 10] : [0, 100]}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                className="text-muted-foreground fill-muted-foreground"
              />
              <Tooltip
                cursor={{ fill: 'currentColor', opacity: 0.05 }}
                content={({ active, payload }) => {
                  if (active && payload && payload[0]) {
                    const item = payload[0].payload as {
                      avaliacao: string
                      sigla: string
                      media: number
                      aprovacao: number
                      participantes: number
                    }
                    return (
                      <div className="bg-popover border border-border rounded-xl p-3 shadow-lg text-xs space-y-1">
                        <p className="font-semibold text-foreground">{item.avaliacao}</p>
                        <p className="text-muted-foreground">
                          {activeMetric === 'media' ? (
                            <>
                              Média:{' '}
                              <span className="font-bold text-blue-600">
                                {item.media} / 10
                              </span>
                            </>
                          ) : (
                            <>
                              Aprovação:{' '}
                              <span className="font-bold text-emerald-600">
                                {item.aprovacao}%
                              </span>
                            </>
                          )}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {item.participantes} alunos realizaram
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar
                dataKey={activeMetric}
                fill={activeMetric === 'media' ? '#2563eb' : '#10b981'}
                radius={[8, 8, 0, 0]}
                maxBarSize={48}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
