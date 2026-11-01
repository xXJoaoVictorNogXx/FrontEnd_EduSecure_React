import { BreadcrumbsNavigation } from './breadcrumb'
import { ModeToggle } from '@/components/mode-toggle'
import { Search, Bell } from 'lucide-react'

export function Header() {
  return (
    <div className="flex flex-1 items-center justify-between px-2 sm:px-4 gap-4">
      <BreadcrumbsNavigation />

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block w-48 lg:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <button
          type="button"
          title="Notificações"
          className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
        </button>

        <ModeToggle />
      </div>
    </div>
  )
}
