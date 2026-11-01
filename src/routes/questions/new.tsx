import { createFileRoute } from '@tanstack/react-router'
import CreateQuestionScreen from '#/pages/questions/CreateQuestionScreen'

export const Route = createFileRoute('/questions/new')({
  staticData: {
    breadcrumb: 'Nova questão',
  },
  component: CreateQuestionScreen,
})

