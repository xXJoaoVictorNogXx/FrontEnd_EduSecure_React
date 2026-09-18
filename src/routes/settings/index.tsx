import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/settings/')({
  staticData: {
    breadcrumb: 'Settings',
  },

  component: () => <Outlet />,
})

function RouteComponent() {
  return <div>Hello "/settings/"!</div>
}
