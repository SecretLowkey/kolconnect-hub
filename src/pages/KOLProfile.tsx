import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Star, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  MessageCircle,
  Twitter,
  Linkedin,
  Globe,
  MapPin,
  Clock,
  Calendar,
  DollarSign,
  Eye,
  ThumbsUp,
  Heart,
  Share2,
  ExternalLink,
  ArrowLeft,
  Video,
  Mic,
  FileText,
  BarChart3,
  Award,
  Verified,
  Shield
} from "lucide-react";

interface KOL {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  coverImage: string;
  bio: string;
  followers: string;
  followersCount: number;
  engagement: string;
  engagementRate: number;
  rating: number;
  reviews: number;
  specializations: string[];
  isVerified: boolean;
  successfulCampaigns: number;
  hourlyRate: string;
  hourlyRateMin: number;
  hourlyRateMax: number;
  responseTime: string;
  location: string;
  timezone: string;
  languages: string[];
  chainFocus: string[];
  availabilityStatus: 'available' | 'busy' | 'unavailable';
  lastActive: string;
  portfolioItems: number;
  totalEarnings: string;
  avgROI: string;
  joinedDate: string;
  socialLinks: {
    twitter: string;
    linkedin?: string;
    website?: string;
  };
  services: Array<{
    type: string;
    description: string;
    price: string;
    deliveryTime: string;
    included: string[];
  }>;
  portfolio: Array<{
    id: string;
    title: string;
    client: string;
    type: string;
    thumbnail: string;
    metrics: {
      reach: string;
      engagement: string;
      clicks: string;
      roi: string;
    };
    date: string;
    description: string;
  }>;
  testimonials: Array<{
    id: string;
    client: string;
    avatar: string;
    rating: number;
    text: string;
    date: string;
    campaign: string;
    verified: boolean;
  }>;
}

// Sample KOL data with comprehensive information
const kolDataById: Record<string, KOL> = {
  "1": {
    id: "1",
    name: "Alex Chen",
    handle: "@cryptoalex",
    avatar: "/avatars/alex.jpg",
    coverImage: "/covers/alex-cover.jpg",
    bio: "Crypto educator and DeFi researcher with 5+ years in the space. Former Goldman Sachs analyst turned full-time crypto content creator. Passionate about making complex DeFi concepts accessible to retail investors. Known for in-depth thread breakdowns and accurate market analysis.",
    followers: "245K",
    followersCount: 245000,
    engagement: "8.2%",
    engagementRate: 8.2,
    rating: 4.9,
    reviews: 127,
    specializations: ["DeFi", "Layer 1", "Trading", "Market Analysis"],
    isVerified: true,
    successfulCampaigns: 89,
    hourlyRate: "$200-300",
    hourlyRateMin: 200,
    hourlyRateMax: 300,
    responseTime: "< 2 hours",
    location: "Singapore",
    timezone: "GMT+8",
    languages: ["English", "Mandarin"],
    chainFocus: ["Ethereum", "Solana", "Polygon"],
    availabilityStatus: 'available',
    lastActive: "2 hours ago",
    portfolioItems: 15,
    totalEarnings: "$245K",
    avgROI: "340%",
    joinedDate: "January 2022",
    socialLinks: {
      twitter: "https://twitter.com/cryptoalex",
      linkedin: "https://linkedin.com/in/alexchen",
      website: "https://alexchen.crypto"
    },
    services: [
      {
        type: "Twitter Thread",
        description: "In-depth educational threads about DeFi protocols, market analysis, and trading strategies",
        price: "$500-800",
        deliveryTime: "24-48 hours",
        included: ["10-15 tweets", "Custom graphics", "Engagement optimization", "Performance report"]
      },
      {
        type: "Twitter Spaces",
        description: "Host or co-host Twitter Spaces discussing crypto topics, interviewing founders",
        price: "$300-500",
        deliveryTime: "1-2 weeks",
        included: ["60-90 min session", "Promotion", "Recording", "Follow-up content"]
      },
      {
        type: "Video Content",
        description: "Educational videos explaining protocols, market trends, and investment strategies",
        price: "$800-1200",
        deliveryTime: "3-5 days",
        included: ["5-10 min video", "Script writing", "Professional editing", "Thumbnails"]
      }
    ],
    portfolio: [
      {
        id: "1",
        title: "Uniswap V4 Deep Dive Thread",
        client: "Uniswap Labs",
        type: "Twitter Thread",
        thumbnail: "/portfolio/uniswap-thread.jpg",
        metrics: {
          reach: "2.1M",
          engagement: "125K",
          clicks: "45K",
          roi: "420%"
        },
        date: "March 2024",
        description: "Comprehensive breakdown of Uniswap V4 features, hooks system, and implications for DeFi"
      },
      {
        id: "2",
        title: "DeFi Summer Retrospective",
        client: "Polygon Labs",
        type: "Video Series",
        thumbnail: "/portfolio/defi-summer.jpg",
        metrics: {
          reach: "1.8M",
          engagement: "98K",
          clicks: "67K",
          roi: "280%"
        },
        date: "February 2024",
        description: "Multi-part video series analyzing DeFi protocols and their evolution"
      }
    ],
    testimonials: [
      {
        id: "1",
        client: "Sarah from Uniswap Labs",
        avatar: "/avatars/sarah-uni.jpg",
        rating: 5,
        text: "Alex delivered exceptional content that perfectly explained our V4 update. His technical depth combined with clear communication drove massive engagement and educated our community.",
        date: "March 2024",
        campaign: "Uniswap V4 Launch",
        verified: true
      },
      {
        id: "2",
        client: "Marcus - Polygon Team",
        avatar: "/avatars/marcus-poly.jpg",
        rating: 5,
        text: "Outstanding video series that helped our community understand DeFi concepts. Alex's analytical approach and market insights were exactly what we needed.",
        date: "February 2024",
        campaign: "DeFi Education Series",
        verified: true
      }
    ]
  }
  // Add more KOL data as needed...
};

export default function KOLProfile() {
  const { kolId } = useParams<{ kolId: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);

  const kol = kolId ? kolDataById[kolId] : null;

  if (!kol) {
    return (
      <div className="min-h-screen bg-background">
        <Header isAuthenticated={false} />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">KOL Not Found</h1>
          <p className="text-muted-foreground mb-6">The KOL profile you're looking for doesn't exist.</p>
          <Link to="/kols">
            <Button>Back to Directory</Button>
          </Link>
        </div>
      </div>
    );
  }

  const HireModal = () => (
    <Dialog open={isHireModalOpen} onOpenChange={setIsHireModalOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Hire {kol.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Project Title</label>
            <Input placeholder="Enter your project title..." />
          </div>
          <div>
            <label className="text-sm font-medium">Service Type</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                {kol.services.map((service, index) => (
                  <SelectItem key={index} value={service.type}>{service.type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Budget Range</label>
            <Input placeholder="e.g. $500-1000" />
          </div>
          <div>
            <label className="text-sm font-medium">Project Description</label>
            <Textarea placeholder="Describe your project requirements..." rows={4} />
          </div>
          <div className="flex gap-2 pt-4">
            <Button onClick={() => setIsHireModalOpen(false)} variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button className="flex-1">Send Proposal</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={false} />
      
      {/* Cover Section */}
      <div 
        className="relative h-64 bg-gradient-to-r from-primary/20 to-secondary/20"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(${kol.coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
        
        {/* Breadcrumb */}
        <div className="absolute top-6 left-6">
          <Link to="/kols" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Directory
          </Link>
        </div>
      </div>

      {/* Profile Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="glass-card p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            {/* Avatar & Basic Info */}
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24 ring-4 ring-primary/20">
                <AvatarImage src={kol.avatar} alt={kol.name} />
                <AvatarFallback className="text-2xl">{kol.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl lg:text-3xl font-bold">{kol.name}</h1>
                  {kol.isVerified && (
                    <CheckCircle className="h-6 w-6 text-crypto-blue" />
                  )}
                  <Badge 
                    variant={kol.availabilityStatus === 'available' ? 'default' : 'secondary'}
                    className="ml-2"
                  >
                    {kol.availabilityStatus}
                  </Badge>
                </div>
                
                <p className="text-lg text-muted-foreground mb-3">{kol.handle}</p>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {kol.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {kol.timezone}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Joined {kol.joinedDate}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="lg:ml-auto flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="glass-card">
                <MessageCircle className="mr-2 h-4 w-4" />
                Message
              </Button>
              <Button onClick={() => setIsHireModalOpen(true)} className="btn-secondary">
                <DollarSign className="mr-2 h-4 w-4" />
                Hire Me
              </Button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-8 pt-6 border-t border-border/50">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-primary mb-1">
                <Users className="h-4 w-4" />
                <span className="font-bold text-lg">{kol.followers}</span>
              </div>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-secondary mb-1">
                <TrendingUp className="h-4 w-4" />
                <span className="font-bold text-lg">{kol.engagement}</span>
              </div>
              <p className="text-xs text-muted-foreground">Engagement</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-primary mb-1">
                <Star className="h-4 w-4 fill-primary" />
                <span className="font-bold text-lg">{kol.rating}</span>
              </div>
              <p className="text-xs text-muted-foreground">{kol.reviews} reviews</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-crypto-blue mb-1">
                <Award className="h-4 w-4" />
                <span className="font-bold text-lg">{kol.successfulCampaigns}</span>
              </div>
              <p className="text-xs text-muted-foreground">Campaigns</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-secondary mb-1">
                <BarChart3 className="h-4 w-4" />
                <span className="font-bold text-lg">{kol.avgROI}</span>
              </div>
              <p className="text-xs text-muted-foreground">Avg ROI</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-primary mb-1">
                <MessageCircle className="h-4 w-4" />
                <span className="font-bold text-lg">{kol.responseTime}</span>
              </div>
              <p className="text-xs text-muted-foreground">Response</p>
            </div>
          </div>
        </div>

        {/* Tabbed Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="glass-card p-1 h-auto">
            <TabsTrigger value="overview" className="px-6 py-3">Overview</TabsTrigger>
            <TabsTrigger value="portfolio" className="px-6 py-3">Portfolio</TabsTrigger>
            <TabsTrigger value="reviews" className="px-6 py-3">Reviews</TabsTrigger>
            <TabsTrigger value="services" className="px-6 py-3">Services</TabsTrigger>
            <TabsTrigger value="stats" className="px-6 py-3">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Bio & Details */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{kol.bio}</p>
                  </CardContent>
                </Card>

                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle>Specializations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {kol.specializations.map((spec) => (
                        <Badge key={spec} variant="secondary" className="bg-secondary/20 text-secondary border-secondary/30">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle>Blockchain Networks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {kol.chainFocus.map((chain) => (
                        <Badge key={chain} variant="outline" className="border-primary/30 text-primary">
                          {chain}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle>Quick Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Languages:</span>
                      <span className="font-medium">{kol.languages.join(', ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Rate:</span>
                      <span className="font-medium text-primary">{kol.hourlyRate}/hr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Earned:</span>
                      <span className="font-medium text-secondary">{kol.totalEarnings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Active:</span>
                      <span className="font-medium">{kol.lastActive}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle>Social Links</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <a href={kol.socialLinks.twitter} target="_blank" rel="noopener noreferrer" 
                       className="flex items-center gap-3 text-crypto-blue hover:text-crypto-blue/80 transition-colors">
                      <Twitter className="h-4 w-4" />
                      Twitter Profile
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </a>
                    {kol.socialLinks.linkedin && (
                      <a href={kol.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                         className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                        <ExternalLink className="h-3 w-3 ml-auto" />
                      </a>
                    )}
                    {kol.socialLinks.website && (
                      <a href={kol.socialLinks.website} target="_blank" rel="noopener noreferrer"
                         className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                        <Globe className="h-4 w-4" />
                        Website
                        <ExternalLink className="h-3 w-3 ml-auto" />
                      </a>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {kol.portfolio.map((item) => (
                <Card key={item.id} className="glass-card border-0 overflow-hidden card-hover">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                        {item.type}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <span className="text-sm text-muted-foreground">{item.date}</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 glass-card rounded-lg">
                        <div className="text-lg font-bold text-primary">{item.metrics.reach}</div>
                        <div className="text-xs text-muted-foreground">Reach</div>
                      </div>
                      <div className="text-center p-3 glass-card rounded-lg">
                        <div className="text-lg font-bold text-secondary">{item.metrics.engagement}</div>
                        <div className="text-xs text-muted-foreground">Engagement</div>
                      </div>
                      <div className="text-center p-3 glass-card rounded-lg">
                        <div className="text-lg font-bold text-crypto-blue">{item.metrics.clicks}</div>
                        <div className="text-xs text-muted-foreground">Clicks</div>
                      </div>
                      <div className="text-center p-3 glass-card rounded-lg">
                        <div className="text-lg font-bold text-primary">{item.metrics.roi}</div>
                        <div className="text-xs text-muted-foreground">ROI</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Client: {item.client}</span>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            {/* Rating Summary */}
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">{kol.rating}</div>
                    <div className="flex items-center justify-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(kol.rating) ? 'text-primary fill-primary' : 'text-muted-foreground'}`} />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">{kol.reviews} reviews</div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center gap-3">
                          <span className="text-sm w-8">{stars}★</span>
                          <div className="flex-1 bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary rounded-full h-2 transition-all"
                              style={{ width: `${stars === 5 ? 80 : stars === 4 ? 15 : 5}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-8">
                            {stars === 5 ? '80%' : stars === 4 ? '15%' : '5%'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Individual Reviews */}
            <div className="space-y-4">
              {kol.testimonials.map((review) => (
                <Card key={review.id} className="glass-card border-0">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={review.avatar} alt={review.client} />
                        <AvatarFallback>{review.client.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{review.client}</h4>
                          {review.verified && (
                            <Badge variant="outline" className="text-xs border-crypto-blue text-crypto-blue">
                              <Verified className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                          <span className="text-sm text-muted-foreground">• {review.date}</span>
                        </div>
                        
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-primary fill-primary' : 'text-muted-foreground'}`} />
                          ))}
                        </div>
                        
                        <p className="text-muted-foreground mb-3">{review.text}</p>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-muted-foreground">Campaign: {review.campaign}</span>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-8 px-3">
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              Helpful
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kol.services.map((service, index) => (
                <Card key={index} className="glass-card border-0">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      {service.type === 'Twitter Thread' && <FileText className="h-5 w-5 text-primary" />}
                      {service.type === 'Twitter Spaces' && <Mic className="h-5 w-5 text-secondary" />}
                      {service.type === 'Video Content' && <Video className="h-5 w-5 text-crypto-blue" />}
                      <CardTitle className="text-lg">{service.type}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Price:</span>
                        <span className="font-semibold text-primary">{service.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Delivery:</span>
                        <span className="font-medium">{service.deliveryTime}</span>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-medium text-sm mb-2">What's included:</h4>
                      <ul className="space-y-1">
                        {service.included.map((item, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button className="w-full btn-secondary">
                      Select Package
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="text-lg">Performance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Success Rate</span>
                      <span className="font-bold text-primary">98.9%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Avg. Engagement</span>
                      <span className="font-bold text-secondary">{kol.engagement}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Client Retention</span>
                      <span className="font-bold text-crypto-blue">85%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Avg. ROI</span>
                      <span className="font-bold text-primary">{kol.avgROI}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="text-lg">Monthly Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Followers</span>
                      <span className="font-bold text-primary">+12.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Engagement</span>
                      <span className="font-bold text-secondary">+8.3%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Campaign Volume</span>
                      <span className="font-bold text-crypto-blue">+15.7%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Revenue</span>
                      <span className="font-bold text-primary">+22.1%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="text-lg">Trust Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">On-time Delivery</span>
                      <span className="font-bold text-primary">100%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Communication</span>
                      <span className="font-bold text-secondary">4.9/5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Professionalism</span>
                      <span className="font-bold text-crypto-blue">4.9/5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Would Rehire</span>
                      <span className="font-bold text-primary">94%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <HireModal />
    </div>
  );
}