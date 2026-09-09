import { BreadcrumbsNavigation } from './breadcrumb'
import { ModeToggle } from '@/components/mode-toggle'

export function Header() {
  return (
    <div className="flex flex-1 items-center justify-between px-4">
      <BreadcrumbsNavigation />

      <div className="flex items-center gap-4">
        <ModeToggle />
      </div>
    </div>
  )
}
