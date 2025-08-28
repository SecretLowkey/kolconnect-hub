import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import { DollarSign, Star, Briefcase, TrendingUp, Calendar, MessageSquare } from 'lucide-react'

interface KOLStats {
  total_earnings: number
  total_campaigns: number
  rating: number
  active_applications: number
}

export default function KOLDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState<KOLStats>({
    total_earnings: 0,
    total_campaigns: 0,
    rating: 0,
    active_applications: 0
  })
  const [recentCampaigns, setRecentCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.id) {
      loadDashboardData()
    }
  }, [user?.id])

  const loadDashboardData = async () => {
    try {
      // Load KOL profile stats
      const { data: kolProfile } = await supabase
        .from('kol_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single()

      if (kolProfile) {
        setStats({
          total_earnings: kolProfile.total_earnings || 0,
          total_campaigns: kolProfile.total_campaigns || 0,
          rating: kolProfile.rating || 0,
          active_applications: 0 // Will be calculated from applications
        })
      }

      // Load recent campaigns
      const { data: campaigns } = await supabase
        .from('campaigns')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(5)

      setRecentCampaigns(campaigns || [])

      // Load active applications count
      const { count } = await supabase
        .from('campaign_applications')
        .select('*', { count: 'exact', head: true })
        .eq('kol_id', user?.id)
        .eq('status', 'pending')

      if (count !== null) {
        setStats(prev => ({ ...prev, active_applications: count }))
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded-lg"></div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold">Welcome back, @{user?.profile?.twitter_username}!</h1>
          <p className="text-muted-foreground mt-2">Here's your KOL performance overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.total_earnings.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Campaigns Completed</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_campaigns}</div>
              <p className="text-xs text-muted-foreground">+2 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.rating.toFixed(1)}/5.0</div>
              <p className="text-xs text-muted-foreground">Excellent performance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.active_applications}</div>
              <p className="text-xs text-muted-foreground">Pending review</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Opportunities */}
        <Card>
          <CardHeader>
            <CardTitle>Latest Campaign Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            {recentCampaigns.length > 0 ? (
              <div className="space-y-4">
                {recentCampaigns.map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{campaign.title}</h3>
                      <p className="text-sm text-muted-foreground">{campaign.description.substring(0, 100)}...</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="secondary">
                          ${campaign.budget_min?.toLocaleString()} - ${campaign.budget_max?.toLocaleString()}
                        </Badge>
                        <Badge variant="outline">
                          {campaign.duration_days} days
                        </Badge>
                      </div>
                    </div>
                    <Button>Apply Now</Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No active campaigns available</p>
                <Button className="mt-4">Browse All Opportunities</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}