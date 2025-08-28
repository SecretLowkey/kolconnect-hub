import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import { DollarSign, Users, Briefcase, TrendingUp, Plus, Eye } from 'lucide-react'

interface ProjectStats {
  total_spent: number
  total_campaigns: number
  active_campaigns: number
  total_applications: number
}

export default function ProjectDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState<ProjectStats>({
    total_spent: 0,
    total_campaigns: 0,
    active_campaigns: 0,
    total_applications: 0
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
      // Load project profile stats
      const { data: projectProfile } = await supabase
        .from('project_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single()

      if (projectProfile) {
        setStats(prev => ({
          ...prev,
          total_spent: projectProfile.total_spent || 0,
          total_campaigns: projectProfile.total_campaigns || 0
        }))
      }

      // Load campaigns
      const { data: campaigns } = await supabase
        .from('campaigns')
        .select('*')
        .eq('project_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(5)

      setRecentCampaigns(campaigns || [])

      // Count active campaigns
      const { count: activeCampaigns } = await supabase
        .from('campaigns')
        .select('*', { count: 'exact', head: true })
        .eq('project_id', user?.id)
        .eq('status', 'active')

      // Count total applications
      const { count: totalApplications } = await supabase
        .from('campaign_applications')
        .select('campaigns!inner(*)', { count: 'exact', head: true })
        .eq('campaigns.project_id', user?.id)

      setStats(prev => ({
        ...prev,
        active_campaigns: activeCampaigns || 0,
        total_applications: totalApplications || 0
      }))
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Project Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage your campaigns and track performance</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Campaign
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.total_spent.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Across all campaigns</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_campaigns}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.active_campaigns}</div>
              <p className="text-xs text-muted-foreground">Currently running</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_applications}</div>
              <p className="text-xs text-muted-foreground">From KOLs</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Campaigns */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            {recentCampaigns.length > 0 ? (
              <div className="space-y-4">
                {recentCampaigns.map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold">{campaign.title}</h3>
                        <Badge 
                          variant={
                            campaign.status === 'active' ? 'default' :
                            campaign.status === 'completed' ? 'secondary' :
                            campaign.status === 'draft' ? 'outline' : 'destructive'
                          }
                        >
                          {campaign.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{campaign.description.substring(0, 100)}...</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="secondary">
                          ${campaign.budget_min?.toLocaleString()} - ${campaign.budget_max?.toLocaleString()}
                        </Badge>
                        <Badge variant="outline">
                          {campaign.applications_count} applications
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No campaigns created yet</p>
                <Button className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Campaign
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}