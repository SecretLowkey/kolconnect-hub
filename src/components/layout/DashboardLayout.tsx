import { ReactNode } from 'react'
import { DashboardHeader } from './DashboardHeader'
import { DashboardSidebar } from './DashboardSidebar'
import { useAuth } from '@/hooks/useAuth'
import { Navigate } from 'react-router-dom'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, loading, isAuthenticated } = useAuth()

  // Show loading for longer during OAuth redirects
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Give extra time for OAuth session to be processed
  if (!isAuthenticated) {
    // Check if this might be an OAuth redirect by looking for hash fragments
    if (window.location.hash.includes('access_token') || window.location.search.includes('code=')) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="ml-4">Processing authentication...</p>
        </div>
      )
    }
    return <Navigate to="/auth" replace />
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <div className="lg:pl-64">
        <DashboardHeader />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}