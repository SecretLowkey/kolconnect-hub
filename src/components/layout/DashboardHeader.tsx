import { Bell, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/useAuth'

export function DashboardHeader() {
  const { user } = useAuth()

  return (
    <header className="bg-background border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search campaigns, KOLs, or projects..."
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full"></span>
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
              {user?.profile?.avatar_url ? (
                <img 
                  src={user.profile.avatar_url} 
                  alt="Profile" 
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <span className="text-xs font-medium">
                  {user?.profile?.twitter_username?.charAt(0).toUpperCase() || 'U'}
                </span>
              )}
            </div>
            <span className="text-sm font-medium">
              @{user?.profile?.twitter_username || 'user'}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}