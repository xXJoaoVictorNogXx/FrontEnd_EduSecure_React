import React, { useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  User,
  Sparkles,
  Star,
  Pencil,
  CheckCircle2,
  MessageSquare,
  Check,
  Send,
  RotateCcw,
} from 'lucide-react'
import { Toaster, toast } from 'sonner'
import { Link } from '@tanstack/react-router'

interface TextSegment {
  id: string
  text: string
  type: 'correct' | 'partial' | 'incorrect'
  feedback: string
}

interface StudentRecord {
  id: string
  name: string
  initials: string
  ra: string
  course: string
  questionNumber: number
  totalQuestions: number
  maxScore: number
  statement: string
  charCount: number
  segments: TextSegment[]
  aiScore: number
  aiFeedback: string
  correctCount: number
  partialCount: number
  incorrectCount: number
}

const STUDENTS_DATA: StudentRecord[] = [
  {
    id: '1',
    name: 'Mariana Costa',
    initials: 'MC',
    ra: 'RA - 2024-0341',
    course: 'Engenharia de Software — ENG-204 · 17/08/2026',
    questionNumber: 8,
    totalQuestions: 15,
    maxScore: 2.0,
    statement:
      'Explique os princípios SOLID e cite um exemplo prático de aplicação do Princípio da Responsabilidade Única (SRP) no desenvolvimento de software orientado a objetos.',
    charCount: 582,
    segments: [
      {
        id: 's1',
        text: 'SOLID é um conjunto de cinco princípios de design de software criado por Robert C. Martin.',
        type: 'correct',
        feedback:
          'Identificação precisa do acrônimo SOLID e menção correta à autoria de Robert C. Martin.',
      },
      {
        id: 's2',
        text: ' O S representa o Princípio da Responsabilidade Única, que diz que uma classe deve ter apenas uma razão para mudar.',
        type: 'correct',
        feedback:
          'Definição conceitual exata e consagrada do Princípio da Responsabilidade Única (SRP).',
      },
      {
        id: 's3',
        text: ' Por exemplo, em um sistema de e-commerce, não devemos misturar a lógica de envio de e-mails dentro da classe Pedido. O correto é criar uma classe separada, como NotificacaoEmail, para tratar apenas do envio de mensagens. Isso facilita a manutenção e os testes unitários.',
        type: 'correct',
        feedback:
          'Exemplo prático contextualizado com separação clara de responsabilidades e justificativa técnica sólida.',
      },
      {
        id: 's4',
        text: ' Os outros princípios são: Open/Closed, Liskov Substitution, Interface Segregation e Dependency Inversion.',
        type: 'partial',
        feedback:
          'Enumeração correta de todos os outros 4 princípios, porém sem breve descrição conceitual de cada um.',
      },
    ],
    aiScore: 1.7,
    aiFeedback:
      'Resposta demonstra compreensão sólida do SRP com exemplo adequado. Ponto a melhorar: a questão pede foco no SRP, e o aluno o atendeu bem, mas brevidade na explicação dos demais princípios reduz ligeiramente a completude.',
    correctCount: 4,
    partialCount: 1,
    incorrectCount: 0,
  },
  {
    id: '2',
    name: 'Lucas Almeida',
    initials: 'LA',
    ra: 'RA - 2024-0198',
    course: 'Engenharia de Software — ENG-204 · 17/08/2026',
    questionNumber: 9,
    totalQuestions: 15,
    maxScore: 2.0,
    statement:
      'Explique os princípios SOLID e cite um exemplo prático de aplicação do Princípio da Responsabilidade Única (SRP) no desenvolvimento de software orientado a objetos.',
    charCount: 624,
    segments: [
      {
        id: 'la1',
        text: 'Os princípios SOLID formam diretrizes fundamentais para uma arquitetura limpa e de baixo acoplamento.',
        type: 'correct',
        feedback: 'Excelente introdução contextualizando arquitetura limpa e modularidade.',
      },
      {
        id: 'la2',
        text: ' O Princípio da Responsabilidade Única (SRP) preceitua que cada componente ou classe deve possuir uma única e estrita atribuição no sistema.',
        type: 'correct',
        feedback: 'Definição impecável do princípio SRP.',
      },
      {
        id: 'la3',
        text: ' Na prática, em vez de uma classe RelatorioFinanceiro gerar os dados em PDF e gravá-los no S3, ela deve apenas formatar os dados, delegando o armazenamento a um servico de storage dedicado.',
        type: 'correct',
        feedback: 'Exemplo prático refinado e amplamente alinhado a padrões enterprise.',
      },
      {
        id: 'la4',
        text: ' Além disso, temos: OCP (extensão sem modificação), LSP (subtipos substituíveis), ISP (interfaces específicas) e DIP (dependência de abstrações).',
        type: 'correct',
        feedback: 'Resumo assertivo e completo de todos os princípios restantes.',
      },
    ],
    aiScore: 2.0,
    aiFeedback:
      'Resposta excelente e completa. Abordou tanto o conceito teórico quanto um exemplo prático de alta relevância, além de sintetizar com precisão os demais princípios do SOLID.',
    correctCount: 4,
    partialCount: 0,
    incorrectCount: 0,
  },
  {
    id: '3',
    name: 'Beatriz Silva',
    initials: 'BS',
    ra: 'RA - 2024-0512',
    course: 'Engenharia de Software — ENG-204 · 17/08/2026',
    questionNumber: 10,
    totalQuestions: 15,
    maxScore: 2.0,
    statement:
      'Explique os princípios SOLID e cite um exemplo prático de aplicação do Princípio da Responsabilidade Única (SRP) no desenvolvimento de software orientado a objetos.',
    charCount: 388,
    segments: [
      {
        id: 'bs1',
        text: 'SOLID são boas práticas voltadas para a programação orientada a objetos.',
        type: 'partial',
        feedback: 'Definição superficial; ausência de histórico e significado da sigla.',
      },
      {
        id: 'bs2',
        text: ' O SRP diz que uma classe deve fazer somente uma tarefa. Por exemplo, uma classe Cliente só cuida de clientes e não de emitir boletos.',
        type: 'correct',
        feedback: 'Exemplo simples e coerente com a proposta do princípio de responsabilidade única.',
      },
      {
        id: 'bs3',
        text: ' Não lembro exatamente a explicação dos outros quatro princípios da sigla.',
        type: 'incorrect',
        feedback: 'Omissão completa dos outros princípios demandados no enunciado.',
      },
    ],
    aiScore: 1.0,
    aiFeedback:
      'A aluna compreendeu o cerne do princípio SRP com exemplo funcional, porém não respondeu adequadamente à contextualização inicial e omitiu os outros quatro princípios do SOLID.',
    correctCount: 2,
    partialCount: 1,
    incorrectCount: 1,
  },
]

const RUBRIC_OPTIONS = [
  { label: 'Completo e preciso', score: 2.0 },
  { label: 'Satisfatório com lacunas', score: 1.5 },
  { label: 'Parcialmente correto', score: 1.0 },
  { label: 'Insuficiente', score: 0.5 },
]

export default function CorrectionScreen() {
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0)
  const currentStudent = STUDENTS_DATA[currentStudentIndex]

  const [score, setScore] = useState<number>(currentStudent.aiScore)
  const [activeTooltip, setActiveTooltip] = useState<{
    id: string
    feedback: string
    type: 'correct' | 'partial' | 'incorrect'
  } | null>(null)

  const [showCommentBox, setShowCommentBox] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [savedComments, setSavedComments] = useState<Record<string, string>>({})
  const [isConfirmed, setIsConfirmed] = useState(false)

  // When changing student, reset interactive fields
  const handleSelectStudent = (index: number) => {
    setCurrentStudentIndex(index)
    setScore(STUDENTS_DATA[index].aiScore)
    setIsConfirmed(false)
    setShowCommentBox(false)
    setCommentText(savedComments[STUDENTS_DATA[index].id] || '')
    setActiveTooltip(null)
  }

  const handlePrevStudent = () => {
    if (currentStudentIndex > 0) {
      handleSelectStudent(currentStudentIndex - 1)
    }
  }

  const handleNextStudent = () => {
    if (currentStudentIndex < STUDENTS_DATA.length - 1) {
      handleSelectStudent(currentStudentIndex + 1)
    } else {
      handleSelectStudent(0) // cycle back for demo convenience
    }
  }

  const handleScoreChange = (newVal: number) => {
    const clamped = Math.max(0, Math.min(2.0, parseFloat(newVal.toFixed(1))))
    setScore(clamped)
    setIsConfirmed(false)
  }

  const handleResetToAI = () => {
    setScore(currentStudent.aiScore)
    setIsConfirmed(false)
    toast.info(`Nota redefinida para a sugestão da IA: ${currentStudent.aiScore}`)
  }

  const handleConfirmScore = () => {
    setIsConfirmed(true)
    toast.success(
      `Nota de ${score.toFixed(1)} confirmada com sucesso para ${currentStudent.name}!`
    )
  }

  const handleSaveComment = () => {
    if (!commentText.trim()) {
      toast.error('Escreva um comentário antes de salvar.')
      return
    }
    setSavedComments((prev) => ({
      ...prev,
      [currentStudent.id]: commentText,
    }))
    toast.success('Comentário adicionado à correção!')
    setShowCommentBox(false)
  }

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] dark:bg-background text-slate-900 dark:text-slate-100 p-6 md:p-8 font-sans antialiased transition-colors">
      <Toaster position="top-right" richColors />

      <div className="max-w-7xl mx-auto space-y-6">
        {/* TOP BAR / BREADCRUMB & STUDENT NAV */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs md:text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-card border border-slate-200 dark:border-border rounded-lg hover:bg-slate-50 dark:hover:bg-muted shadow-xs transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Voltar
            </Link>

            <nav className="flex items-center text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium">
              <span>Avaliações</span>
              <span className="mx-2 text-slate-300 dark:text-slate-700">/</span>
              <span>AED-301</span>
              <span className="mx-2 text-slate-300 dark:text-slate-700">/</span>
              <span className="text-slate-700 dark:text-slate-300 font-semibold">
                Correções
              </span>
            </nav>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={handlePrevStudent}
              disabled={currentStudentIndex === 0}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs md:text-sm font-medium rounded-lg border border-slate-200 dark:border-border transition-colors ${currentStudentIndex === 0
                  ? 'bg-slate-100 dark:bg-muted/50 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                  : 'bg-white dark:bg-card text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-muted shadow-xs cursor-pointer'
                }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Anterior
            </button>

            <button
              onClick={handleNextStudent}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs md:text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm transition-all cursor-pointer"
            >
              Próximo aluno
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* TITLE & SUBTITLE */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Relatório de Correção
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Revisão assistida por IA · Questão discursiva
          </p>
        </div>

        {/* STUDENT INFO HEADER CARD */}
        <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-xl p-4 md:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-blue-600 text-white font-bold text-sm md:text-base flex items-center justify-center shrink-0 shadow-xs">
              {currentStudent.initials}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-slate-900 dark:text-slate-100 text-base md:text-lg">
                  {currentStudent.name}
                </span>
                <span className="font-mono text-[11px] bg-slate-100 dark:bg-muted text-slate-600 dark:text-muted-foreground px-2 py-0.5 rounded border border-slate-200/70 dark:border-border">
                  {currentStudent.ra}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-muted-foreground mt-0.5">
                {currentStudent.course}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 sm:gap-8 self-end sm:self-auto border-t sm:border-t-0 pt-3 sm:pt-0 w-full sm:w-auto justify-between sm:justify-end">
            <div className="text-left sm:text-right">
              <span className="block text-[11px] font-medium text-slate-400 dark:text-slate-500">
                Questão
              </span>
              <span className="text-base md:text-lg font-bold text-slate-800 dark:text-slate-200">
                {currentStudent.questionNumber} / {currentStudent.totalQuestions}
              </span>
            </div>

            <div className="text-right">
              <span className="block text-[11px] font-medium text-slate-400 dark:text-slate-500">
                Pontuação máx.
              </span>
              <span className="text-base md:text-lg font-bold text-slate-800 dark:text-slate-200">
                {currentStudent.maxScore.toFixed(1)} pts
              </span>
            </div>
          </div>
        </div>

        {/* MAIN 2-COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN - 8 COLS */}
          <div className="lg:col-span-8 space-y-5">
            {/* 1. ENUNCIADO CARD */}
            <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-xl p-5 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-3">
                <FileText className="w-4 h-4 text-blue-500" />
                <span>ENUNCIADO</span>
              </div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200 leading-relaxed">
                {currentStudent.statement}
              </p>
            </div>

            {/* 2. RESPOSTA DO ALUNO CARD */}
            <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-400" />
                  <span>RESPOSTA DO ALUNO</span>
                </div>
                <span className="font-normal text-[11px] text-slate-400 font-mono">
                  {currentStudent.charCount} caracteres
                </span>
              </div>

              {/* HIGHLIGHTED RESPONSE TEXT */}
              <div className="relative text-sm font-normal text-slate-800 dark:text-slate-200 leading-relaxed min-h-[120px]">
                {currentStudent.segments.map((segment) => {
                  let underlineClass =
                    'border-b-2 border-emerald-400 dark:border-emerald-500 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/40 text-slate-800 dark:text-slate-100'
                  if (segment.type === 'partial') {
                    underlineClass =
                      'border-b-2 border-amber-400 dark:border-amber-500 hover:bg-amber-50/70 dark:hover:bg-amber-950/40 text-slate-800 dark:text-slate-100'
                  } else if (segment.type === 'incorrect') {
                    underlineClass =
                      'border-b-2 border-rose-400 dark:border-rose-500 hover:bg-rose-50/70 dark:hover:bg-rose-950/40 text-slate-800 dark:text-slate-100'
                  }

                  return (
                    <span
                      key={segment.id}
                      onMouseEnter={() =>
                        setActiveTooltip({
                          id: segment.id,
                          feedback: segment.feedback,
                          type: segment.type,
                        })
                      }
                      onMouseLeave={() => setActiveTooltip(null)}
                      className={`relative inline cursor-pointer transition-all duration-150 pb-0.5 rounded-xs ${underlineClass}`}
                    >
                      {segment.text}
                    </span>
                  )
                })}

                {/* DYNAMIC HOVER TOOLTIP */}
                {activeTooltip && (
                  <div className="absolute z-20 left-4 right-4 -top-14 sm:-top-12 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg shadow-xl flex items-center gap-2 animate-in fade-in zoom-in-95 pointer-events-none">
                    <span
                      className={`inline-block w-2 h-2 rounded-full shrink-0 ${activeTooltip.type === 'correct'
                          ? 'bg-emerald-400'
                          : activeTooltip.type === 'partial'
                            ? 'bg-amber-400'
                            : 'bg-rose-400'
                        }`}
                    />
                    <span className="font-semibold capitalize text-slate-300">
                      {activeTooltip.type === 'correct'
                        ? 'Correto'
                        : activeTooltip.type === 'partial'
                          ? 'Parcial'
                          : 'Incorreto'}
                      :
                    </span>
                    <span className="text-slate-100 line-clamp-2">
                      {activeTooltip.feedback}
                    </span>
                  </div>
                )}
              </div>

              {/* LEGEND BAR */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-3 border-t border-slate-100 dark:border-border text-xs text-slate-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block w-3 h-1 bg-emerald-400 rounded-full" />
                    <span>Correto</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block w-3 h-1 bg-amber-400 rounded-full" />
                    <span>Parcial</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block w-3 h-1 bg-rose-400 rounded-full" />
                    <span>Incorreto</span>
                  </div>
                </div>

                <span className="text-[11px] text-slate-400">
                  Passe o cursor sobre o texto para ver o feedback
                </span>
              </div>
            </div>

            {/* 3. FEEDBACK DA IA CARD */}
            <div className="bg-gradient-to-br from-blue-50/40 via-sky-50/20 to-white dark:from-blue-950/20 dark:to-card border border-blue-200/90 dark:border-blue-900/60 rounded-xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
                  <Sparkles className="w-4 h-4" />
                  <span>Feedback da IA</span>
                </div>

                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-card border border-blue-200/80 dark:border-blue-900 shadow-2xs">
                  <span className="text-slate-600 dark:text-slate-400">Nota sugerida:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {currentStudent.aiScore.toFixed(1)}
                  </span>
                  <span className="text-slate-400">/ {currentStudent.maxScore.toFixed(1)}</span>
                </div>
              </div>

              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentStudent.aiFeedback}
              </p>

              {/* SUMMARY STATS (Segments count) */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-[#ecfdf5] dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 rounded-xl py-3 px-4 text-center">
                  <span className="block text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {currentStudent.correctCount}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Segmentos corretos
                  </span>
                </div>

                <div className="bg-[#fffbeb] dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40 rounded-xl py-3 px-4 text-center">
                  <span className="block text-2xl font-bold text-amber-600 dark:text-amber-400">
                    {currentStudent.partialCount}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Segmentos parciais
                  </span>
                </div>
              </div>
            </div>

            {/* OPTIONAL SAVED TEACHER COMMENT DISPLAY */}
            {savedComments[currentStudent.id] && (
              <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-xl p-4 shadow-xs">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  <div className="flex items-center gap-2 text-blue-600">
                    <MessageSquare className="w-4 h-4" />
                    <span>Comentário do Professor</span>
                  </div>
                  <button
                    onClick={() => {
                      setCommentText(savedComments[currentStudent.id])
                      setShowCommentBox(true)
                    }}
                    className="text-blue-600 hover:underline cursor-pointer text-xs normal-case font-medium"
                  >
                    Editar
                  </button>
                </div>
                <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-muted/40 p-3 rounded-lg border border-slate-100 dark:border-border">
                  {savedComments[currentStudent.id]}
                </p>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN - 4 COLS */}
          <div className="lg:col-span-4 space-y-5">
            {/* 1. NOTA FINAL CARD */}
            <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-xl p-5 shadow-xs space-y-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
                <Star className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                <span>Nota Final</span>
              </div>

              {/* BIG SCORE DISPLAY BOX */}
              <div className="bg-slate-50/90 dark:bg-muted/30 border border-slate-100 dark:border-border rounded-2xl py-6 px-4 text-center flex flex-col items-center justify-center">
                <div className="text-5xl font-black text-emerald-500 tracking-tight">
                  {score.toFixed(1)}
                </div>
                <div className="text-xs font-medium text-slate-400 mt-1">
                  de {currentStudent.maxScore.toFixed(1)} pontos
                </div>
              </div>

              {/* SLIDER ADJUSTMENT */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>Ajustar nota</span>
                  <span>0 — {currentStudent.maxScore.toFixed(1)}</span>
                </div>

                <input
                  type="range"
                  min="0"
                  max={currentStudent.maxScore}
                  step="0.1"
                  value={score}
                  onChange={(e) => handleScoreChange(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-800 dark:accent-slate-200"
                />
              </div>

              {/* SCORE INPUT & AI RESET BUTTON */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1 flex items-center border border-slate-200 dark:border-border rounded-lg px-3 py-2 bg-white dark:bg-card focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
                  <Pencil className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max={currentStudent.maxScore}
                    value={score}
                    onChange={(e) => handleScoreChange(parseFloat(e.target.value) || 0)}
                    className="w-full bg-transparent text-sm font-semibold text-slate-800 dark:text-slate-100 outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleResetToAI}
                  title="Restaurar sugestão da IA"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-card border border-slate-200 dark:border-border rounded-lg hover:bg-slate-50 dark:hover:bg-muted shadow-2xs transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>IA</span>
                </button>
              </div>
            </div>

            {/* 2. RUBRICA RÁPIDA CARD */}
            <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-xl p-5 shadow-xs space-y-3">
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                Rubrica rápida
              </h3>

              <div className="space-y-1.5">
                {RUBRIC_OPTIONS.map((rubric) => {
                  const isSelected = Math.abs(score - rubric.score) < 0.05
                  return (
                    <button
                      key={rubric.label}
                      type="button"
                      onClick={() => handleScoreChange(rubric.score)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs md:text-sm font-medium transition-all text-left cursor-pointer ${isSelected
                          ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-muted border border-transparent'
                        }`}
                    >
                      <span>{rubric.label}</span>
                      <span
                        className={`font-mono font-semibold ${isSelected
                            ? 'text-blue-600 dark:text-blue-300'
                            : 'text-slate-400'
                          }`}
                      >
                        {rubric.score.toFixed(1)}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 3. ACTION BUTTONS */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={handleConfirmScore}
                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm transition-all shadow-sm cursor-pointer ${isConfirmed
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-[0.99]'
                  }`}
              >
                {isConfirmed ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Nota confirmada ({score.toFixed(1)} pts)</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirmar nota</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowCommentBox((prev) => !prev)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-medium text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-card border border-slate-200 dark:border-border hover:bg-slate-50 dark:hover:bg-muted transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-slate-500" />
                <span>
                  {showCommentBox ? 'Ocultar comentário' : 'Adicionar comentário'}
                </span>
              </button>
            </div>

            {/* EXPANDABLE COMMENT BOX */}
            {showCommentBox && (
              <div className="bg-white dark:bg-card border border-slate-200 dark:border-border rounded-xl p-4 shadow-sm space-y-3 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Comentário para {currentStudent.name.split(' ')[0]}</span>
                  <span className="text-slate-400 font-normal">Opcional</span>
                </div>

                <textarea
                  rows={3}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Ex: Excelente fundamentação! Recomendo aprofundar na explicação dos demais princípios SOLID..."
                  className="w-full text-xs text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-muted/40 border border-slate-200 dark:border-border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                />

                {/* QUICK SUGGESTIONS */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    Sugestões rápidas:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {[
                      'Excelente raciocínio prático!',
                      'Bom exemplo de SRP.',
                      'Atenção à completude dos tópicos.',
                    ].map((sug) => (
                      <button
                        key={sug}
                        type="button"
                        onClick={() =>
                          setCommentText((prev) => (prev ? `${prev} ${sug}` : sug))
                        }
                        className="text-[10px] px-2 py-1 bg-slate-100 dark:bg-muted text-slate-600 dark:text-slate-300 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        + {sug}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowCommentBox(false)}
                    className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700 cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveComment}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs cursor-pointer"
                  >
                    <Send className="w-3 h-3" />
                    Salvar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
