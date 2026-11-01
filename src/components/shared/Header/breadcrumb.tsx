import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { useRouterState } from '@tanstack/react-router'

export function BreadcrumbsNavigation() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  const isNewQuestion = pathname.includes('/questions/new')

  const getPageTitle = () => {
    if (pathname.includes('/settings')) return 'Correções'
    if (isNewQuestion) return 'Nova questão'
    if (pathname.includes('/questions')) return 'Banco de Questões'
    return 'Dashboard'
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {isNewQuestion ? (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href="/questions">Banco de Questões</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Nova questão</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : (
          <BreadcrumbItem>
            <BreadcrumbPage>{getPageTitle()}</BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
