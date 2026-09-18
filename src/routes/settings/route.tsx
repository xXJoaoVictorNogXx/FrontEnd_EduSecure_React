import SettingsScreen from '#/pages/SettingsScreen'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/settings')({
  component: SettingsScreen,
})

function RouteComponent() {
  return <div>Hello "/dashboard/"!</div>
}
