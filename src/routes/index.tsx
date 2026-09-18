import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  loader: async ({ params }) => {
    return redirect({
      to: '/dashboard',
    })
  },
})
