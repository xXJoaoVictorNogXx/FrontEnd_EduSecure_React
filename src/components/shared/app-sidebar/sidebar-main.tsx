import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { LayoutDashboard, Settings, Users } from 'lucide-react'
import { Link } from '@tanstack/react-router'

const items = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Banco de Questões', url: '/bancoDeQuestoes', icon: Users },
  { title: 'Correções', url: '/correcoes', icon: Settings },
]

export function MainNavigation() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild tooltip={item.title} className="">
              <Link
                to={item.url}
                activeProps={{
                  className: 'flex items-center gap-2 ',
                }}
              >
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
