import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  staticData: {
    breadcrumb: 'Dashboard',
  },

  component: () => <Outlet />,
})
