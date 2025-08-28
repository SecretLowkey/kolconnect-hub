import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  TrendingUp, 
  Star, 
  Users, 
  DollarSign,
  CheckCircle,
  Medal,
  Award,
  Crown,
  Target,
  BarChart3,
  Calendar
} from "lucide-react";

interface LeaderboardKOL {
  id: string;
  rank: number;
  name: string;
  handle: string;
  avatar: string;
  score: number;
  change: number; // +/- from last period
  followers: string;
  engagement: string;
  campaigns: number;
  revenue: string;
  rating: number;
  specialization: string;
  tier: 'diamond' | 'platinum' | 'gold' | 'silver' | 'bronze';
  isVerified: boolean;
  monthlyGrowth: number;
  successRate: number;
}

const leaderboardData: LeaderboardKOL[] = [
  {
    id: "1",
    rank: 1,
    name: "Alex Chen",
    handle: "@cryptoalex",
    avatar: "/avatars/alex.jpg",
    score: 98.5,
    change: 2.1,
    followers: "245K",
    engagement: "8.2%",
    campaigns: 89,
    revenue: "$45,200",
    rating: 4.9,
    specialization: "DeFi",
    tier: 'diamond',
    isVerified: true,
    monthlyGrowth: 15.3,
    successRate: 96.2
  },
  {
    id: "2",
    rank: 2,
    name: "Sarah Williams",
    handle: "@defi_sarah",
    avatar: "/avatars/sarah.jpg",
    score: 95.8,
    change: -0.5,
    followers: "180K",
    engagement: "9.1%",
    campaigns: 67,
    revenue: "$38,900",
    rating: 4.8,
    specialization: "DeFi",
    tier: 'diamond',
    isVerified: true,
    monthlyGrowth: 12.7,
    successRate: 94.8
  },
  {
    id: "3",
    rank: 3,
    name: "Marcus Rodriguez",
    handle: "@nft_marcus",
    avatar: "/avatars/marcus.jpg",
    score: 92.4,
    change: 1.8,
    followers: "320K",
    engagement: "7.8%",
    campaigns: 134,
    revenue: "$52,100",
    rating: 4.7,
    specialization: "NFTs",
    tier: 'platinum',
    isVerified: true,
    monthlyGrowth: 18.2,
    successRate: 92.1
  },
  {
    id: "4",
    rank: 4,
    name: "Emma Thompson",
    handle: "@crypto_emma",
    avatar: "/avatars/emma.jpg",
    score: 89.7,
    change: 3.2,
    followers: "95K",
    engagement: "12.3%",
    campaigns: 78,
    revenue: "$29,400",
    rating: 5.0,
    specialization: "Memecoins",
    tier: 'platinum',
    isVerified: true,
    monthlyGrowth: 22.1,
    successRate: 98.7
  },
  {
    id: "5",
    rank: 5,
    name: "David Kim",
    handle: "@blockchain_dave",
    avatar: "/avatars/david.jpg",
    score: 87.3,
    change: -1.2,
    followers: "156K",
    engagement: "6.9%",
    campaigns: 93,
    revenue: "$34,800",
    rating: 4.6,
    specialization: "Layer 1",
    tier: 'gold',
    isVerified: true,
    monthlyGrowth: 9.4,
    successRate: 88.7
  }
];

const getTierIcon = (tier: string) => {
  switch (tier) {
    case 'diamond': return <Crown className="h-5 w-5 text-cyan-400" />;
    case 'platinum': return <Medal className="h-5 w-5 text-gray-300" />;
    case 'gold': return <Trophy className="h-5 w-5 text-yellow-500" />;
    case 'silver': return <Award className="h-5 w-5 text-gray-400" />;
    case 'bronze': return <Medal className="h-5 w-5 text-orange-600" />;
    default: return <Trophy className="h-5 w-5" />;
  }
};

const getTierColor = (tier: string) => {
  switch (tier) {
    case 'diamond': return 'border-cyan-400/30 bg-cyan-400/10';
    case 'platinum': return 'border-gray-300/30 bg-gray-300/10';
    case 'gold': return 'border-yellow-500/30 bg-yellow-500/10';
    case 'silver': return 'border-gray-400/30 bg-gray-400/10';
    case 'bronze': return 'border-orange-600/30 bg-orange-600/10';
    default: return 'border-border/30 bg-background/10';
  }
};

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState("overall");
  const [timePeriod, setTimePeriod] = useState("monthly");

  const topThree = leaderboardData.slice(0, 3);
  const restOfList = leaderboardData.slice(3);

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={false} />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-6 text-primary border-primary/30 bg-primary/10">
            <Trophy className="w-3 h-3 mr-2" />
            Top Performers
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold mb-6">
            KOL <span className="text-gradient-gold">Leaderboard</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the highest-performing crypto influencers based on engagement, 
            campaign success, and community impact
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList className="grid w-full grid-cols-4 glass-card">
              <TabsTrigger value="overall">Overall</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="growth">Growth</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Button 
              variant={timePeriod === "monthly" ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimePeriod("monthly")}
              className="text-xs"
            >
              Monthly
            </Button>
            <Button 
              variant={timePeriod === "weekly" ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimePeriod("weekly")}
              className="text-xs"
            >
              Weekly
            </Button>
            <Button 
              variant={timePeriod === "alltime" ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimePeriod("alltime")}
              className="text-xs"
            >
              All Time
            </Button>
          </div>
        </div>

        <Tabs value={activeTab}>
          <TabsContent value="overall" className="space-y-8">
            {/* Top 3 Podium */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* 2nd Place */}
              <div className="md:order-1 md:mt-8">
                <Card className={`glass-card border-0 text-center ${getTierColor(topThree[1].tier)}`}>
                  <CardContent className="p-6">
                    <div className="relative mb-4">
                      <Avatar className="h-20 w-20 mx-auto ring-4 ring-gray-300/30">
                        <AvatarImage src={topThree[1].avatar} alt={topThree[1].name} />
                        <AvatarFallback>{topThree[1].name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -top-2 -right-2 h-8 w-8 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        2
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <h3 className="font-semibold">{topThree[1].name}</h3>
                      {topThree[1].isVerified && <CheckCircle className="h-4 w-4 text-crypto-blue" />}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{topThree[1].handle}</p>
                    <div className="text-2xl font-bold text-gradient-emerald mb-2">{topThree[1].score}</div>
                    <Badge variant="secondary" className="mb-4">{topThree[1].specialization}</Badge>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <div className="text-primary font-medium">{topThree[1].followers}</div>
                        <div className="text-muted-foreground">Followers</div>
                      </div>
                      <div>
                        <div className="text-secondary font-medium">{topThree[1].engagement}</div>
                        <div className="text-muted-foreground">Engagement</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 1st Place */}
              <div className="md:order-2">
                <Card className={`glass-card border-0 text-center ${getTierColor(topThree[0].tier)} glow-primary`}>
                  <CardContent className="p-6">
                    <div className="relative mb-4">
                      <Avatar className="h-24 w-24 mx-auto ring-4 ring-primary/50">
                        <AvatarImage src={topThree[0].avatar} alt={topThree[0].name} />
                        <AvatarFallback>{topThree[0].name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -top-2 -right-2 h-10 w-10 bg-gradient-to-br from-primary to-yellow-400 rounded-full flex items-center justify-center text-black font-bold">
                        <Crown className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <h3 className="font-bold text-lg">{topThree[0].name}</h3>
                      {topThree[0].isVerified && <CheckCircle className="h-5 w-5 text-crypto-blue" />}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{topThree[0].handle}</p>
                    <div className="text-3xl font-bold text-gradient-gold mb-2">{topThree[0].score}</div>
                    <Badge className="mb-4 bg-primary text-primary-foreground">{topThree[0].specialization}</Badge>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <div className="text-primary font-medium">{topThree[0].followers}</div>
                        <div className="text-muted-foreground">Followers</div>
                      </div>
                      <div>
                        <div className="text-secondary font-medium">{topThree[0].engagement}</div>
                        <div className="text-muted-foreground">Engagement</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 3rd Place */}
              <div className="md:order-3 md:mt-12">
                <Card className={`glass-card border-0 text-center ${getTierColor(topThree[2].tier)}`}>
                  <CardContent className="p-6">
                    <div className="relative mb-4">
                      <Avatar className="h-18 w-18 mx-auto ring-4 ring-yellow-500/30">
                        <AvatarImage src={topThree[2].avatar} alt={topThree[2].name} />
                        <AvatarFallback>{topThree[2].name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -top-2 -right-2 h-8 w-8 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        3
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <h3 className="font-semibold">{topThree[2].name}</h3>
                      {topThree[2].isVerified && <CheckCircle className="h-4 w-4 text-crypto-blue" />}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{topThree[2].handle}</p>
                    <div className="text-2xl font-bold text-yellow-500 mb-2">{topThree[2].score}</div>
                    <Badge variant="secondary" className="mb-4">{topThree[2].specialization}</Badge>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <div className="text-primary font-medium">{topThree[2].followers}</div>
                        <div className="text-muted-foreground">Followers</div>
                      </div>
                      <div>
                        <div className="text-secondary font-medium">{topThree[2].engagement}</div>
                        <div className="text-muted-foreground">Engagement</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Rest of Leaderboard */}
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">Top Performers</h2>
              <div className="space-y-3">
                {restOfList.map((kol) => (
                  <Card key={kol.id} className={`glass-card border-0 card-hover ${getTierColor(kol.tier)}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl font-bold text-muted-foreground w-8">
                              #{kol.rank}
                            </div>
                            {getTierIcon(kol.tier)}
                          </div>
                          
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={kol.avatar} alt={kol.name} />
                            <AvatarFallback>{kol.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{kol.name}</h3>
                              {kol.isVerified && <CheckCircle className="h-4 w-4 text-crypto-blue" />}
                            </div>
                            <p className="text-sm text-muted-foreground">{kol.handle}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-6 text-sm">
                          <div className="text-center">
                            <div className="font-medium">{kol.score}</div>
                            <div className="text-xs text-muted-foreground">Score</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium">{kol.followers}</div>
                            <div className="text-xs text-muted-foreground">Followers</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium">{kol.engagement}</div>
                            <div className="text-xs text-muted-foreground">Engagement</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium">{kol.campaigns}</div>
                            <div className="text-xs text-muted-foreground">Campaigns</div>
                          </div>
                          <div className="text-center">
                            <div className={`font-medium ${kol.change > 0 ? 'text-secondary' : 'text-destructive'}`}>
                              {kol.change > 0 ? '+' : ''}{kol.change}%
                            </div>
                            <div className="text-xs text-muted-foreground">Change</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Other tab contents would be similar but with different sorting/metrics */}
          <TabsContent value="engagement">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Engagement leaderboard coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="revenue">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Revenue leaderboard coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="growth">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Growth leaderboard coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <Card className="glass-card border-0 text-center">
            <CardContent className="p-6">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold">5,000+</div>
              <div className="text-sm text-muted-foreground">Active KOLs</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card border-0 text-center">
            <CardContent className="p-6">
              <DollarSign className="h-8 w-8 text-secondary mx-auto mb-3" />
              <div className="text-2xl font-bold">$2.5M+</div>
              <div className="text-sm text-muted-foreground">Total Earned</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card border-0 text-center">
            <CardContent className="p-6">
              <Target className="h-8 w-8 text-crypto-blue mx-auto mb-3" />
              <div className="text-2xl font-bold">15,000+</div>
              <div className="text-sm text-muted-foreground">Campaigns</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card border-0 text-center">
            <CardContent className="p-6">
              <BarChart3 className="h-8 w-8 text-crypto-purple mx-auto mb-3" />
              <div className="text-2xl font-bold">94.8%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
