import React from 'react'
import { Grip, Plus } from 'lucide-react'
import type { QuestaoFrontEndDTO } from '#/types/questoes'
import { getDifficultyColor, getMockTags } from '#/constants/questions'

interface QuestionCardProps {
  questao: QuestaoFrontEndDTO
  onDragStart: (e: React.DragEvent, questao: QuestaoFrontEndDTO) => void
  onAdd: (questao: QuestaoFrontEndDTO) => void
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  questao,
  onDragStart,
  onAdd,
}) => {
  const displayTipo =
    questao.tipo ||
    (questao.categoria.includes('ENG') ? 'Discursiva' : 'Múltipla Escolha')
  const displayTags =
    questao.tags && questao.tags.length > 0
      ? questao.tags
      : getMockTags(questao.categoria)

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, questao)}
      className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/50 shadow-xs cursor-grab active:cursor-grabbing transition-colors"
    >
      <div className="text-muted-foreground opacity-50 shrink-0">
        <Grip className="w-5 h-5" />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-card-foreground mb-2 leading-relaxed">
          {questao.enunciado}
        </h3>
        <div className="flex items-center flex-wrap gap-2 text-xs">
          <span className="font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded">
            {questao.categoria}
          </span>
          <span className="text-muted-foreground">
            {displayTipo}
          </span>
          <span className={`font-semibold ${getDifficultyColor(questao.dificuldade)}`}>
            {questao.dificuldade}
          </span>
          {displayTags.map((tag) => (
            <span
              key={tag}
              className="text-primary bg-primary/10 px-2 py-0.5 rounded font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => onAdd(questao)}
        title="Adicionar à prova"
        className="p-2 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors rounded-lg shrink-0 cursor-pointer"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  )
}
