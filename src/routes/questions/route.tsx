import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/questions')({
  staticData: {
    breadcrumb: 'Questions',
  },
  component: () => <Outlet />,
})
