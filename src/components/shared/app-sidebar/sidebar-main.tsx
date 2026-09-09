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
  { title: 'Usuários', url: '/users', icon: Users },
  { title: 'Configurações', url: '/settings', icon: Settings },
]

export function MainNavigation() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            {/* activeProps do TanStack adiciona estilos quando a rota está ativa */}
            <SidebarMenuButton asChild tooltip={item.title}>
              <Link
                to={item.url}
                activeProps={{
                  className: 'bg-sidebar-accent text-sidebar-accent-foreground',
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
