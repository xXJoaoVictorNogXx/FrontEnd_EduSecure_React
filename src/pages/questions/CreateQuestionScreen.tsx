import React, { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  ArrowLeft,
  BookmarkCheck,
  Check,
  GripVertical,
  HelpCircle,
  Plus,
  Trash2,
  Loader2,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useCriarQuestao } from '#/hooks/useQuestions'

interface AlternativeItem {
  id: string
  texto: string
}

const getLetter = (index: number) => String.fromCharCode(65 + index)

export default function CreateQuestionScreen() {
  const navigate = useNavigate()
  const { mutate: criarQuestaoMutate, isPending } = useCriarQuestao()

  const [enunciado, setEnunciado] = useState('')
  const [tipo, setTipo] = useState('Múltipla Escolha')
  const [disciplina, setDisciplina] = useState('AED-301')
  const [dificuldade, setDificuldade] = useState('Médio')
  const [peso, setPeso] = useState<number | string>(1)
  const [tags, setTags] = useState<string[]>(['#Complexidade'])
  const [tagInput, setTagInput] = useState('')

  const handleAddTag = () => {
    const trimmed = tagInput.trim()
    if (!trimmed) return
    const formattedTag = trimmed.startsWith('#') ? trimmed : `#${trimmed}`
    if (!tags.includes(formattedTag)) {
      setTags((prev) => [...prev, formattedTag])
    }
    setTagInput('')
  }

  const handleKeyDownTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((t) => t !== tagToRemove))
  }

  const [alternativas, setAlternativas] = useState<AlternativeItem[]>([
    { id: '1', texto: '' },
    { id: '2', texto: '' },
    { id: '3', texto: '' },
    { id: '4', texto: '' },
  ])
  const [corretaId, setCorretaId] = useState<string>('1')

  const handleAddAlternative = () => {
    const newId = String(Date.now() + Math.random())
    setAlternativas((prev) => [...prev, { id: newId, texto: '' }])
  }

  const handleRemoveAlternative = (id: string) => {
    if (alternativas.length <= 2) {
      toast.warning('A questão deve ter pelo menos 2 alternativas.')
      return
    }
    const next = alternativas.filter((alt) => alt.id !== id)
    setAlternativas(next)
    if (corretaId === id && next.length > 0) {
      setCorretaId(next[0].id)
    }
  }

  const handleUpdateText = (id: string, texto: string) => {
    setAlternativas((prev) =>
      prev.map((alt) => (alt.id === id ? { ...alt, texto } : alt))
    )
  }

  const handleCancel = () => {
    navigate({ to: '/questions' })
  }

  const handleSave = () => {
    if (!enunciado.trim()) {
      toast.warning('Informe o enunciado da questão.')
      return
    }

    const hasEmptyAlt = alternativas.some((a) => !a.texto.trim())
    if (hasEmptyAlt) {
      toast.warning('Preencha todas as alternativas antes de salvar.')
      return
    }

    const corretaObj = alternativas.find((a) => a.id === corretaId)
    if (!corretaObj || !corretaObj.texto.trim()) {
      toast.warning('Selecione uma resposta correta válida.')
      return
    }

    criarQuestaoMutate(
      {
        enunciado: enunciado.trim(),
        tipo,
        disciplina,
        categoria: disciplina,
        peso: Number(peso) || 1,
        alternativas: alternativas.map((a) => a.texto.trim()),
        alternativaCorreta: corretaObj.texto.trim(),
        dificuldade,
        tags: tags.length > 0 ? tags : [`#${disciplina}`],
      },
      {
        onSuccess: () => {
          navigate({ to: '/questions' })
        },
      }
    )
  }

  return (
    <div className="flex-1 overflow-y-auto bg-muted/20 p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="p-2 rounded-xl border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer mt-0.5"
              title="Voltar ao banco de questões"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                Criar nova questão
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Cadastre uma questão de múltipla escolha para usar em suas avaliações.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="rounded-xl px-5 text-sm cursor-pointer"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={isPending}
              className="rounded-xl px-5 bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2 cursor-pointer shadow-xs"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Salvando...</span>
                </>
              ) : (
                <>
                  <BookmarkCheck className="w-4 h-4" />
                  <span>Salvar e continuar</span>
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-xs space-y-6">
              <div>
                <h2 className="text-base font-semibold text-foreground">
                  Conteúdo da questão
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  Defina o enunciado e marque a alternativa correta.
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Enunciado
                </label>
                <textarea
                  rows={5}
                  value={enunciado}
                  onChange={(e) => setEnunciado(e.target.value)}
                  placeholder="Ex.: Qual é a complexidade de tempo da busca binária no pior caso?"
                  className="w-full border border-input rounded-xl p-3.5 text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary transition-all resize-y min-h-[120px]"
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Seja claro e evite ambiguidades.</span>
                  <span>{enunciado.length} caracteres</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      Alternativas
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Selecione o círculo ao lado da resposta correta.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 px-3 py-1 rounded-full">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    1 resposta correta
                  </span>
                </div>

                <div className="space-y-3 pt-1">
                  {alternativas.map((alt, index) => {
                    const isSelected = corretaId === alt.id
                    const letter = getLetter(index)

                    return (
                      <div
                        key={alt.id}
                        className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-150 ${isSelected
                          ? 'border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/20 shadow-2xs ring-1 ring-emerald-500/30'
                          : 'border-border bg-card hover:border-border/80'
                          }`}
                      >
                        <GripVertical className="w-4 h-4 text-muted-foreground/40 shrink-0 cursor-grab active:cursor-grabbing" />

                        <button
                          type="button"
                          onClick={() => setCorretaId(alt.id)}
                          className="shrink-0 focus:outline-none cursor-pointer"
                          title={
                            isSelected
                              ? 'Resposta correta'
                              : 'Marcar como resposta correta'
                          }
                        >
                          {isSelected ? (
                            <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-xs">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/40 hover:border-emerald-600 transition-colors" />
                          )}
                        </button>

                        <span className="font-semibold text-sm text-foreground shrink-0 w-5">
                          {letter}.
                        </span>

                        <input
                          type="text"
                          value={alt.texto}
                          onChange={(e) => handleUpdateText(alt.id, e.target.value)}
                          placeholder={`Digite a alternativa ${letter}`}
                          className="flex-1 bg-transparent border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                        />

                        <button
                          type="button"
                          onClick={() => handleRemoveAlternative(alt.id)}
                          title="Remover alternativa"
                          className="text-muted-foreground/60 hover:text-destructive p-1 rounded-md transition-colors shrink-0 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )
                  })}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddAlternative}
                  className="rounded-xl mt-2 text-xs font-medium cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 mr-1.5" />
                  Adicionar alternativa
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-xs space-y-5">
              <h2 className="text-sm font-semibold text-foreground">
                Configurações
              </h2>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-foreground">
                  Tipo
                </label>
                <div className="relative">
                  <select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    className="w-full border border-input rounded-xl px-3.5 py-2.5 text-sm bg-background text-foreground outline-none focus:ring-2 focus:ring-primary appearance-none pr-8 cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '1em',
                    }}
                  >
                    <option value="Múltipla Escolha">Múltipla Escolha</option>
                  </select>
                </div>
                <p className="text-xs text-muted-foreground">
                  Outros tipos serão adicionados em breve.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-foreground">
                  Disciplina
                </label>
                <div className="relative">
                  <select
                    value={disciplina}
                    onChange={(e) => setDisciplina(e.target.value)}
                    className="w-full border border-input rounded-xl px-3.5 py-2.5 text-sm bg-background text-foreground outline-none focus:ring-2 focus:ring-primary appearance-none pr-8 cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '1em',
                    }}
                  >
                    <option value="AED-301">AED-301</option>
                    <option value="ENG-204">ENG-204</option>
                    <option value="BDI-102">BDI-102</option>
                    <option value="MAT-101">MAT-101</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-foreground">
                  Dificuldade
                </label>
                <div className="relative">
                  <select
                    value={dificuldade}
                    onChange={(e) => setDificuldade(e.target.value)}
                    className="w-full border border-input rounded-xl px-3.5 py-2.5 text-sm bg-background text-foreground outline-none focus:ring-2 focus:ring-primary appearance-none pr-8 cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '1em',
                    }}
                  >
                    <option value="Fácil">Fácil</option>
                    <option value="Médio">Médio</option>
                    <option value="Difícil">Difícil</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-foreground">
                  Peso
                </label>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    min="0.25"
                    step="0.25"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                    className="w-full border border-input rounded-xl px-3.5 py-2.5 pr-20 text-sm bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
                  />
                  <span className="absolute right-3.5 text-xs text-muted-foreground pointer-events-none">
                    ponto(s)
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-foreground">
                  Tags (Tópicos da Matéria)
                </label>

                <div className="flex flex-wrap gap-1.5 min-h-[26px]">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 px-2 py-0.5 rounded-md"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-red-500 transition-colors cursor-pointer"
                        title="Remover tag"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleKeyDownTag}
                    placeholder="Adicionar tag (ex: #SQL, #POO)"
                    className="flex-1 border border-input rounded-xl px-3 py-1.5 text-xs bg-background text-foreground outline-none focus:ring-1 focus:ring-primary"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddTag}
                    className="h-8 px-2.5 text-xs rounded-xl cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </Button>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Pressione Enter ou clique no + para adicionar.
                </p>
              </div>
            </div>

            <div className="bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-800/60 rounded-2xl p-5 flex items-start gap-3.5">
              <div className="p-1 rounded-full bg-sky-100 dark:bg-sky-900/60 text-sky-600 dark:text-sky-300 shrink-0 mt-0.5">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-sky-950 dark:text-sky-200">
                  Próxima etapa
                </h3>
                <p className="text-xs text-sky-800/80 dark:text-sky-300/80 leading-relaxed">
                  Ao salvar, você voltará ao banco de questões e poderá adicionar esta questão à prova.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

