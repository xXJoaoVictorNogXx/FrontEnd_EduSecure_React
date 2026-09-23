import { useDashboard } from '#/hooks/use-dashboard'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Database, FileText, Target, Users } from 'lucide-react'

export function SectionCards() {
  const { data, isLoading, isError } = useDashboard()

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error occurred while fetching data.</div>
      ) : (
        <div className="grid grid-cols-4 gap-4 @container/main:grid-cols-2 @5xl/main:grid-cols-4 w-full">
          <Card className="@container/card">
            <CardHeader>
              <CardDescription className="flex   p-2 w-fit">
                Progresso da Turma
              </CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {data?.progresso.concluidas}
              </CardTitle>
              <CardAction></CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                provas aplicadas
              </div>
            </CardFooter>
          </Card>
          <Card className="@container/card">
            <CardHeader>
              <CardDescription className="flex bg-green-100 rounded p-2 w-fit">
                <Target className="h-5 w-5 text-green-500" />
              </CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {data?.mediaTurma}
              </CardTitle>
              <CardAction>{data?.mediaTrend}</CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Média por Turma
              </div>
            </CardFooter>
          </Card>
          <Card className="@container/card">
            <CardHeader>
              <CardDescription className="flex bg-yellow-100 rounded p-2 w-fit">
                <Users className="h-5 w-5 text-yellow-500" />
              </CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {data?.taxaConclusao}
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Taxa de Conclusão
              </div>
            </CardFooter>
          </Card>
          <Card className="@container/card">
            <CardHeader>
              <CardDescription className="flex bg-purple-100 rounded p-2 w-fit">
                <Database className="h-5 w-5 text-purple-500" />
              </CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {data?.questoesBanco}
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Questões no Banco
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
