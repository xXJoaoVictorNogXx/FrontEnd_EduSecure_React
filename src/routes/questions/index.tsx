import DashboardScreen from '#/pages/dashboard/DashboardScreen'
import QuestionsScreen from '#/pages/QuestionsScreen'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/questions/')({
  component: QuestionsScreen,
})

function RouteComponent() {
  return <div>Hello "/dashboard/"!</div>
}
