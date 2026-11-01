import React from 'react'
import { Filter } from 'lucide-react'

interface QuestionFiltersProps {
  disciplina?: string
  dificuldade?: string
  tipo?: string
  onDisciplinaChange?: (value: string) => void
  onDificuldadeChange?: (value: string) => void
  onTipoChange?: (value: string) => void
}

export const QuestionFilters: React.FC<QuestionFiltersProps> = ({
  disciplina = 'Todos',
  dificuldade = 'Todos',
  tipo = 'Todos',
  onDisciplinaChange,
  onDificuldadeChange,
  onTipoChange,
}) => {
  return (
    <div className="flex items-center gap-2 pt-1 flex-wrap">
      <div className="flex items-center justify-center p-2 border border-border rounded-lg text-muted-foreground bg-muted/40 shrink-0">
        <Filter className="w-4 h-4" />
      </div>

      <select
        value={disciplina}
        onChange={(e) => onDisciplinaChange?.(e.target.value)}
        className="border border-input rounded-lg px-3 py-1.5 text-xs text-foreground bg-background outline-none focus:ring-1 focus:ring-primary appearance-none pr-7 cursor-pointer"
        style={{
          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0.5rem center',
          backgroundSize: '0.85em',
        }}
      >
        <option value="Todos">Todos</option>
        <option value="AED-301">AED-301</option>
        <option value="ENG-204">ENG-204</option>
        <option value="BDI-102">BDI-102</option>
        <option value="MAT-101">MAT-101</option>
      </select>

      <select
        value={dificuldade}
        onChange={(e) => onDificuldadeChange?.(e.target.value)}
        className="border border-input rounded-lg px-3 py-1.5 text-xs text-foreground bg-background outline-none focus:ring-1 focus:ring-primary appearance-none pr-7 cursor-pointer"
        style={{
          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0.5rem center',
          backgroundSize: '0.85em',
        }}
      >
        <option value="Todos">Todos</option>
        <option value="Fácil">Fácil</option>
        <option value="Médio">Médio</option>
        <option value="Difícil">Difícil</option>
      </select>

      <select
        value={tipo}
        onChange={(e) => onTipoChange?.(e.target.value)}
        className="border border-input rounded-lg px-3 py-1.5 text-xs text-foreground bg-background outline-none focus:ring-1 focus:ring-primary appearance-none pr-7 cursor-pointer"
        style={{
          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0.5rem center',
          backgroundSize: '0.85em',
        }}
      >
        <option value="Todos">Todos</option>
        <option value="Múltipla Escolha">Múltipla Escolha</option>
        <option value="Discursiva">Discursiva</option>
      </select>
    </div>
  )
}
