import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/settings')({
  staticData: {
    breadcrumb: 'Correções',
  },
  component: () => <Outlet />,
})
