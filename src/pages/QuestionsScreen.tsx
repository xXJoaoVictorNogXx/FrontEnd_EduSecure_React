import { Button } from '@/components/ui/button'
import react from 'react'

export default function Question() {
  return (
    <div className="flex h-screen ">
      <main className="flex-1 p-8 overflow-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold ">Painel EduSecure</h1>
          <Button variant="default">Nova Sincronização</Button>
        </header>
      </main>
    </div>
  )
}
