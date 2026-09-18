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
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Banco de Questões', url: '/questions', icon: Users },
  { title: 'Correções', url: '/settings', icon: Settings },
]

export function MainNavigation() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem
            key={item.title}
            className="flex items-center text-sm font-medium rounded-md hover:bg-muted "
          >
            <SidebarMenuButton asChild tooltip={item.title}>
              <Link
                to={item.url}
                activeProps={{
                  className: ' ',
                }}
              >
                <span className="flex items-center gap-2">
                  <item.icon />
                  {item.title}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
