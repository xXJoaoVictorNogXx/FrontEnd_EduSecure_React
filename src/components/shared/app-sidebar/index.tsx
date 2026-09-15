import { Sidebar, SidebarContent } from '@/components/ui/sidebar'
import { BrandHeader } from './sidebar-header'
import { MainNavigation } from './sidebar-main'
import { UserFooter } from './sidebar-footer'

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <BrandHeader />

      <SidebarContent>
        <MainNavigation />
      </SidebarContent>

      <UserFooter />
    </Sidebar>
  )
}
