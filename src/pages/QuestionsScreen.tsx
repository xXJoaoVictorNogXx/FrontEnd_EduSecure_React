import React, { useState } from 'react'
import { useQuestions } from '@/hooks/useQuestions'
import {
  Grip,
  Plus,
  Filter,
  Trash2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Toaster, toast } from 'sonner'
import type { QuestaoFrontEndDTO } from '@/types/questoes'

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'fácil':
      return 'text-green-600 dark:text-green-400'
    case 'médio':
      return 'text-orange-500 dark:text-orange-400'
    case 'difícil':
      return 'text-red-500 dark:text-red-400'
    default:
      return 'text-muted-foreground'
  }
}

// Temporary mapping for tags since it's not in the DTO, generating from Category/Difficulty
const getMockTags = (category: string) => {
  if (category === 'AED-301') return ['#Complexidade', '#Ordenação']
  if (category === 'ENG-204') return ['#SOLID', '#POO']
  if (category === 'BDI-102') return ['#Normalização', '#SQL']
  if (category === 'MAT-101') return ['#Limites', '#Cálculo']
  return ['#Geral']
}

export default function QuestionsScreen() {
  const { data: questions, isLoading, isError } = useQuestions()
  const [examQuestions, setExamQuestions] = useState<QuestaoFrontEndDTO[]>([])
  const [tituloProva, setTituloProva] = useState('')

  const handleDragStart = (e: React.DragEvent, questao: QuestaoFrontEndDTO) => {
    e.dataTransfer.setData('application/json', JSON.stringify(questao))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault() // Necessary to allow dropping
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const data = e.dataTransfer.getData('application/json')
    if (data) {
      const questao = JSON.parse(data) as QuestaoFrontEndDTO
      addToExam(questao)
    }
  }

  const addToExam = (questao: QuestaoFrontEndDTO) => {
    if (!examQuestions.find((q) => q.idQuestao === questao.idQuestao)) {
      setExamQuestions([...examQuestions, questao])
    } else {
      toast.error('Essa questão já está na prova!')
    }
  }

  const removeFromExam = (idQuestao: string) => {
    setExamQuestions(examQuestions.filter((q) => q.idQuestao !== idQuestao))
  }

  const handlePublish = () => {
    if (!tituloProva.trim()) {
      toast.warning('Dê um título para a prova antes de publicar.')
      return
    }
    if (examQuestions.length === 0) {
      toast.warning('Adicione questões antes de publicar a prova.')
      return
    }
    
    // Aqui você vai disparar a chamada para a API enviando:
    // { titulo: tituloProva, idProfessor: 'xxx', questoes: examQuestions.map(q => q.idQuestao) }
    console.log('Payload de Publicação:', {
      titulo: tituloProva,
      idProfessor: 'mock-professor-id',
      idsQuestoes: examQuestions.map(q => q.idQuestao)
    });

    toast.success('Prova publicada com Sucesso!')
    setExamQuestions([]) // clear after publish
    setTituloProva('') // clear title
  }

  return (
    <div className="flex flex-col h-full w-full text-foreground">
      <Toaster position="top-right" richColors />

      {/* Main Content Area */}
      <div className="flex flex-1 h-full w-full overflow-hidden">
        {/* Left Side: Filters and Questions */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Filters Bar */}
          <div className="px-6 py-4 flex items-center gap-3 border-b border-border bg-background">
            <div className="flex items-center justify-center p-2 border border-border rounded text-muted-foreground bg-muted/50">
              <Filter className="w-4 h-4" />
            </div>
            {/* Filter Dropdowns */}
            {['Todos', 'Todos', 'Todos'].map((label, idx) => (
              <select
                key={idx}
                className="border border-input rounded-md px-3 py-1.5 text-sm text-foreground bg-background outline-none focus:border-primary appearance-none pr-8 relative cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.5rem center',
                  backgroundSize: '1em',
                }}
              >
                <option>{label}</option>
              </select>
            ))}
          </div>

          {/* Question List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {isLoading ? (
              <div className="text-muted-foreground">Carregando questões...</div>
            ) : isError ? (
              <div className="text-destructive">Erro ao carregar questões.</div>
            ) : (
              questions?.map((q) => (
                <div
                  key={q.idQuestao}
                  draggable
                  onDragStart={(e) => handleDragStart(e, q)}
                  className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/50 shadow-sm cursor-grab active:cursor-grabbing transition-colors"
                >
                  <div className="text-muted-foreground opacity-50">
                    <Grip className="w-5 h-5" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-card-foreground mb-2">
                      {q.enunciado}
                    </h3>
                    <div className="flex items-center flex-wrap gap-2 text-xs">
                      <span className="font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded">
                        {q.categoria}
                      </span>
                      <span className="text-muted-foreground">
                        {q.categoria.includes('ENG') ? 'Discursiva' : 'Múltipla Escolha'}
                      </span>
                      <span className={`font-semibold ${getDifficultyColor(q.dificuldade)}`}>
                        {q.dificuldade}
                      </span>
                      {getMockTags(q.categoria).map((tag) => (
                        <span key={tag} className="text-primary bg-primary/10 px-2 py-0.5 rounded font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => addToExam(q)}
                    className="p-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors rounded-lg"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Exam Builder Panel */}
        <div
          className={`w-[380px] bg-muted/30 border-l border-border flex flex-col relative transition-colors ${examQuestions.length === 0 ? 'justify-center' : ''}`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {examQuestions.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center p-8 text-muted-foreground opacity-50">
              <Grip className="w-8 h-8 mb-4" />
              <p className="text-sm">
                Arraste questões aqui<br />ou use o botão + no banco
              </p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="p-4 border-b border-border bg-background">
                <h3 className="text-sm font-semibold text-foreground mb-2">Configurações da Prova</h3>
                <input
                  type="text"
                  placeholder="Título da prova (ex: Prova B1 - Programação)"
                  value={tituloProva}
                  onChange={(e) => setTituloProva(e.target.value)}
                  className="w-full border border-input bg-background text-foreground text-sm rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-semibold text-foreground">Questões da Prova</h3>
                  <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">{examQuestions.length}</span>
                </div>
                {examQuestions.map((q, index) => (
                  <div key={q.idQuestao} className="bg-card border border-border p-3 rounded-lg shadow-sm flex items-start gap-3">
                    <div className="font-semibold text-muted-foreground text-sm mt-0.5">{index + 1}.</div>
                    <div className="flex-1 text-sm text-card-foreground">
                      <p className="line-clamp-2">{q.enunciado}</p>
                    </div>
                    <button onClick={() => removeFromExam(q.idQuestao)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-background border-t border-border p-4 flex gap-3 shadow-sm mt-auto">
            <Button variant="outline" className="flex-1 rounded-full text-foreground">
              Salvar rascunho
            </Button>
            <Button onClick={handlePublish} className="flex-1 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              Publicar prova
            </Button>
          </div>

          {examQuestions.length === 0 && (
            <button className="absolute bottom-20 right-4 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm shadow-lg hover:opacity-90 transition-opacity">
              ?
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
