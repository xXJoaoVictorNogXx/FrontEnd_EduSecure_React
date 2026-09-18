import DashboardScreen from '#/pages/dashboard/DashboardScreen'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  component: DashboardScreen,
})

function RouteComponent() {
  return <div>Hello "/dashboard/"!</div>
}
