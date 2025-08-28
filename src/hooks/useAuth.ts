import { useState, useEffect } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/integrations/supabase/client'
import type { Database } from '@/integrations/supabase/types'

type UserProfile = Database['public']['Tables']['users']['Row']
type KOLProfile = Database['public']['Tables']['kol_profiles']['Row']
type ProjectProfile = Database['public']['Tables']['project_profiles']['Row']

interface AuthUser extends User {
  profile?: UserProfile
  kolProfile?: KOLProfile
  projectProfile?: ProjectProfile
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session?.user) {
        loadUserProfile(session.user)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      if (session?.user) {
        loadUserProfile(session.user)
      } else {
        setUser(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadUserProfile = async (authUser: User) => {
    try {
      // Get user profile
      let { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single()

      // If no profile exists, this is a new user from Twitter OAuth
      // We'll let the callback page handle profile creation with the correct user_type
      
      let kolProfile = null
      let projectProfile = null

      if (profile) {
        if (profile.user_type === 'kol') {
          const { data } = await supabase
            .from('kol_profiles')
            .select('*')
            .eq('user_id', authUser.id)
            .single()
          kolProfile = data
        } else if (profile.user_type === 'project') {
          const { data } = await supabase
            .from('project_profiles')
            .select('*')
            .eq('user_id', authUser.id)
            .single()
          projectProfile = data
        }
      }

      setUser({
        ...authUser,
        profile,
        kolProfile,
        projectProfile
      })
    } catch (error) {
      console.error('Error loading user profile:', error)
      // Even if profile loading fails, set the auth user
      setUser({
        ...authUser,
        profile: null,
        kolProfile: null,
        projectProfile: null
      })
    } finally {
      setLoading(false)
    }
  }

  const signInWithTwitter = async (userType: 'kol' | 'project') => {
    try {
      console.log('🚀 Starting Twitter OAuth for userType:', userType)
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'twitter',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          // CRITICAL: Store user_type in OAuth metadata so the database trigger can access it
          data: {
            user_type: userType
          }
        }
      })
      
      if (error) {
        console.error('❌ OAuth error:', error)
        throw error
      }
      
      console.log('✅ OAuth initiated successfully with user_type in metadata')
      return { data, error: null }
    } catch (error) {
      console.error('❌ Error signing in with Twitter:', error)
      return { data: null, error }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }


  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user?.id) return

    try {
      const { data, error } = await supabase
        .from('users')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', user.id)
        .select()
        .single()

      if (error) throw error
      
      setUser(prev => prev ? { ...prev, profile: data } : null)
      return { data, error: null }
    } catch (error) {
      console.error('Error updating profile:', error)
      return { data: null, error }
    }
  }

  return {
    user,
    session,
    loading,
    signInWithTwitter,
    signOut,
    updateProfile,
    isAuthenticated: !!session,
    isKOL: user?.profile?.user_type === 'kol',
    isProject: user?.profile?.user_type === 'project'
  }
}