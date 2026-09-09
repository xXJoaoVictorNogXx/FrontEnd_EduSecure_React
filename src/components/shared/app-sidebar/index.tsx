import { Sidebar, SidebarContent } from '@/components/ui/sidebar'
import { BrandHeader } from './sidebar-header'
import { MainNavigation } from './sidebar-main'
import { UserFooter } from './sidebar-footer'

export function AppSidebar() {
  return (
    // 'collapsible="icon"' faz a sidebar encolher virando apenas ícones em telas menores
    <Sidebar collapsible="icon">
      <BrandHeader />

      <SidebarContent>
        <MainNavigation />
      </SidebarContent>

      <UserFooter />
    </Sidebar>
  )
}
