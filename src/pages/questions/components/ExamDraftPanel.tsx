import React from 'react'
import { BookOpen, Grip, Trash2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { QuestaoFrontEndDTO } from '#/types/questoes'

interface ExamDraftPanelProps {
  examQuestions: QuestaoFrontEndDTO[]
  tituloProva: string
  isPublishing?: boolean
  onTituloChange: (titulo: string) => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
  onRemoveQuestion: (idQuestao: string) => void
  onPublish: () => void
  onSaveDraft?: () => void
}

export const ExamDraftPanel: React.FC<ExamDraftPanelProps> = ({
  examQuestions,
  tituloProva,
  isPublishing = false,
  onTituloChange,
  onDragOver,
  onDrop,
  onRemoveQuestion,
  onPublish,
  onSaveDraft,
}) => {
  const isEmpty = examQuestions.length === 0

  return (
    <div
      className="w-[360px] lg:w-[400px] bg-background border-l border-border flex flex-col h-full shrink-0"
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {/* Header */}
      <div className="p-4 border-b border-border space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Sua Prova</span>
          </div>
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 dark:bg-blue-950/50 dark:text-blue-400 px-2.5 py-0.5 rounded-full">
            {examQuestions.length} {examQuestions.length === 1 ? 'questão' : 'questões'}
          </span>
        </div>

        <input
          type="text"
          placeholder="Nova Avaliação — AED-301"
          value={tituloProva}
          onChange={(e) => onTituloChange(e.target.value)}
          className="w-full border border-input bg-background text-foreground text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary placeholder:text-foreground font-medium"
        />
      </div>

      {/* Middle Body */}
      <div className="flex-1 overflow-y-auto p-4">
        {isEmpty ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-muted-foreground/60 select-none">
            <Grip className="w-8 h-8 mb-3 opacity-40" />
            <p className="text-sm leading-relaxed">
              Arraste questões aqui
              <br />
              ou use o botão + no banco
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {examQuestions.map((q, index) => (
              <div
                key={q.idQuestao}
                className="bg-card border border-border p-3 rounded-xl shadow-2xs flex items-start gap-3 hover:border-border/80 transition-all"
              >
                <div className="font-semibold text-muted-foreground text-sm mt-0.5 shrink-0">
                  {index + 1}.
                </div>
                <div className="flex-1 text-sm text-card-foreground min-w-0">
                  <p className="line-clamp-2 leading-snug">{q.enunciado}</p>
                  <span className="inline-block mt-1 text-[11px] font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                    {q.categoria}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveQuestion(q.idQuestao)}
                  title="Remover da prova"
                  className="text-muted-foreground hover:text-destructive transition-colors shrink-0 p-1 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-border flex items-center gap-3 bg-background">
        <Button
          type="button"
          variant="outline"
          onClick={onSaveDraft}
          className="flex-1 rounded-xl text-foreground text-sm cursor-pointer"
        >
          Salvar rascunho
        </Button>
        <Button
          type="button"
          onClick={onPublish}
          disabled={isPublishing}
          className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs"
        >
          {isPublishing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Publicando...</span>
            </>
          ) : (
            <span>Publicar prova</span>
          )}
        </Button>
      </div>
    </div>
  )
}
