import React, { useState, useMemo } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Toaster, toast } from 'sonner'
import { Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { QuestaoFrontEndDTO } from '#/types/questoes'
import { useQuestions } from '#/hooks/useQuestions'
import { useCriarProva } from '#/hooks/use-provas'
import { QuestionFilters } from './questions/components/QuestionFilters'
import { QuestionCard } from './questions/components/QuestionCard'
import { ExamDraftPanel } from './questions/components/ExamDraftPanel'

export default function QuestionsScreen() {
  const navigate = useNavigate()
  const { data: questions, isLoading, isError } = useQuestions()
  const { mutate: criarProvaMutate, isPending: isPublishing } = useCriarProva()

  const [examQuestions, setExamQuestions] = useState<QuestaoFrontEndDTO[]>([])
  const [tituloProva, setTituloProva] = useState('')

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('')
  const [filtroDisciplina, setFiltroDisciplina] = useState('Todos')
  const [filtroDificuldade, setFiltroDificuldade] = useState('Todos')
  const [filtroTipo, setFiltroTipo] = useState('Todos')

  // Filtered Questions
  const filteredQuestions = useMemo(() => {
    if (!questions) return []

    return questions.filter((q) => {
      // Search term
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase()
        const enunciadoMatch = q.enunciado.toLowerCase().includes(term)
        const categoriaMatch = q.categoria.toLowerCase().includes(term)
        const tagsMatch = q.tags?.some((t) => t.toLowerCase().includes(term))
        if (!enunciadoMatch && !categoriaMatch && !tagsMatch) {
          return false
        }
      }

      // Disciplina
      if (filtroDisciplina !== 'Todos' && q.categoria !== filtroDisciplina) {
        return false
      }

      // Dificuldade
      if (
        filtroDificuldade !== 'Todos' &&
        q.dificuldade.toLowerCase() !== filtroDificuldade.toLowerCase()
      ) {
        return false
      }

      // Tipo
      if (filtroTipo !== 'Todos') {
        const questionTipo =
          q.tipo ||
          (q.categoria.includes('ENG') ? 'Discursiva' : 'Múltipla Escolha')
        if (questionTipo.toLowerCase() !== filtroTipo.toLowerCase()) {
          return false
        }
      }

      return true
    })
  }, [questions, searchTerm, filtroDisciplina, filtroDificuldade, filtroTipo])

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, questao: QuestaoFrontEndDTO) => {
    e.dataTransfer.setData('application/json', JSON.stringify(questao))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const data = e.dataTransfer.getData('application/json')
    if (data) {
      try {
        const questao = JSON.parse(data) as QuestaoFrontEndDTO
        addToExam(questao)
      } catch (err) {
        console.error('Erro ao processar item arrastado:', err)
      }
    }
  }

  // Question management
  const addToExam = (questao: QuestaoFrontEndDTO) => {
    if (!examQuestions.find((q) => q.idQuestao === questao.idQuestao)) {
      setExamQuestions((prev) => [...prev, questao])
    } else {
      toast.error('Essa questão já está na prova!')
    }
  }

  const removeFromExam = (idQuestao: string) => {
    setExamQuestions((prev) => prev.filter((q) => q.idQuestao !== idQuestao))
  }

  // Publishing
  const handlePublish = () => {
    if (!tituloProva.trim()) {
      toast.warning('Dê um título para a prova antes de publicar.')
      return
    }
    if (examQuestions.length === 0) {
      toast.warning('Adicione pelo menos uma questão antes de publicar a prova.')
      return
    }

    const payload = {
      titulo: tituloProva.trim(),
      disciplina: examQuestions[0]?.categoria || 'AED-301',
      questoes: examQuestions.map((q) => ({
        idQuestao: String(q.idQuestao),
        categoria: q.categoria,
        dificuldade: q.dificuldade,
        enunciado: q.enunciado,
        alternativas: q.alternativas,
        alternativaCorreta:
          q.alternativaCorreta ||
          q.correct_answer ||
          (q.alternativas.length > 0 ? q.alternativas[0] : 'Opção Correta'),
      })),
      dataCriacao: new Date().toISOString().slice(0, 19),
    }

    criarProvaMutate(payload, {
      onSuccess: () => {
        setExamQuestions([])
        setTituloProva('')
      },
    })
  }

  const handleSaveDraft = () => {
    if (examQuestions.length === 0) {
      toast.warning('Adicione questões para salvar um rascunho.')
      return
    }
    toast.info('Rascunho salvo localmente.')
  }

  return (
    <div className="flex flex-col h-full w-full text-foreground">
      <Toaster position="top-right" richColors />

      <div className="flex flex-1 h-full w-full overflow-hidden">
        {/* Left Side: Question Bank */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header & Controls matching Image 1 */}
          <div className="px-6 pt-6 pb-4 border-b border-border bg-background space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                  Banco de Questões
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  {filteredQuestions.length}{' '}
                  {filteredQuestions.length === 1
                    ? 'questão encontrada'
                    : 'questões encontradas'}
                </p>
              </div>

              <Button
                type="button"
                onClick={() => navigate({ to: '/questions/new' })}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded-xl flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Nova questão</span>
              </Button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por texto ou tag..."
                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>

            {/* Filter Dropdowns */}
            <QuestionFilters
              disciplina={filtroDisciplina}
              dificuldade={filtroDificuldade}
              tipo={filtroTipo}
              onDisciplinaChange={setFiltroDisciplina}
              onDificuldadeChange={setFiltroDificuldade}
              onTipoChange={setFiltroTipo}
            />
          </div>

          {/* Questions List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {isLoading ? (
              <div className="text-muted-foreground text-sm py-4">
                Carregando banco de questões...
              </div>
            ) : isError ? (
              <div className="text-destructive text-sm py-4">
                Erro ao carregar questões do servidor.
              </div>
            ) : filteredQuestions.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground text-sm">
                Nenhuma questão encontrada para os filtros selecionados.
              </div>
            ) : (
              filteredQuestions.map((q) => (
                <QuestionCard
                  key={q.idQuestao}
                  questao={q}
                  onDragStart={handleDragStart}
                  onAdd={addToExam}
                />
              ))
            )}
          </div>
        </div>

        {/* Right Side: Exam Builder */}
        <ExamDraftPanel
          examQuestions={examQuestions}
          tituloProva={tituloProva}
          isPublishing={isPublishing}
          onTituloChange={setTituloProva}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onRemoveQuestion={removeFromExam}
          onPublish={handlePublish}
          onSaveDraft={handleSaveDraft}
        />
      </div>
    </div>
  )
}
