import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { toast } from '@/hooks/use-toast'

export default function AuthCallback() {
  const navigate = useNavigate()
  const { user, loading } = useAuth()

  useEffect(() => {
    const handleCallback = async () => {
      console.log('🔄 AuthCallback: Processing callback...')
      console.log('🔍 User state:', user)
      console.log('🔍 Loading state:', loading)
      
      // Wait for auth to finish loading
      if (loading) {
        console.log('⏳ Still loading, waiting...')
        return
      }

      // If no user after loading, something went wrong
      if (!user) {
        console.log('❌ No user found after callback')
        toast({
          variant: "destructive",
          title: "Authentication Failed",
          description: "Unable to authenticate user. Please try again."
        })
        navigate('/auth')
        return
      }

      // If user exists but no profile yet, wait a bit for the database trigger to complete
      if (user && !user.profile) {
        console.log('⏳ User exists but profile not loaded yet, waiting for database trigger...')
        // Give the database trigger some time to create the profile
        setTimeout(() => {
          window.location.reload() // Reload to get the profile created by the trigger
        }, 2000)
        return
      }

      // If user has profile, redirect to appropriate dashboard
      if (user?.profile) {
        console.log('✅ User authenticated with profile:', user.profile)
        const dashboardType = user.profile.user_type
        console.log('🎯 Redirecting to dashboard:', dashboardType)
        navigate(`/dashboard/${dashboardType}`, { replace: true })
        return
      }
    }

    handleCallback()
  }, [user, loading, navigate])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-lg">Processing authentication...</p>
        <p className="text-sm text-muted-foreground mt-2">
          {!user ? 'Signing you in...' : !user.profile ? 'Setting up your profile...' : 'Redirecting to dashboard...'}
        </p>
      </div>
    </div>
  )
}