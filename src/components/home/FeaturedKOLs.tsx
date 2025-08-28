import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Star, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight,
  Twitter,
  MessageCircle,
  Eye
} from "lucide-react";

interface KOL {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  followers: string;
  engagement: string;
  rating: number;
  reviews: number;
  specializations: string[];
  isVerified: boolean;
  successfulCampaigns: number;
  hourlyRate: string;
  responseTime: string;
}

const featuredKOLs: KOL[] = [
  {
    id: "1",
    name: "Alex Chen",
    handle: "@cryptoalex",
    avatar: "/avatars/alex.jpg",
    followers: "245K",
    engagement: "8.2%",
    rating: 4.9,
    reviews: 127,
    specializations: ["DeFi", "Layer 1", "Trading"],
    isVerified: true,
    successfulCampaigns: 89,
    hourlyRate: "$200-300",
    responseTime: "< 2 hours"
  },
  {
    id: "2",
    name: "Sarah Williams",
    handle: "@defi_sarah",
    avatar: "/avatars/sarah.jpg",
    followers: "180K",
    engagement: "9.1%",
    rating: 4.8,
    reviews: 93,
    specializations: ["DeFi", "Yield Farming", "Protocols"],
    isVerified: true,
    successfulCampaigns: 67,
    hourlyRate: "$150-250",
    responseTime: "< 1 hour"
  },
  {
    id: "3",
    name: "Marcus Rodriguez",
    handle: "@nft_marcus",
    avatar: "/avatars/marcus.jpg",
    followers: "320K",
    engagement: "7.8%",
    rating: 4.7,
    reviews: 156,
    specializations: ["NFTs", "Gaming", "Metaverse"],
    isVerified: true,
    successfulCampaigns: 134,
    hourlyRate: "$250-400",
    responseTime: "< 3 hours"
  },
  {
    id: "4",
    name: "Emma Thompson",
    handle: "@crypto_emma",
    avatar: "/avatars/emma.jpg",
    followers: "95K",
    engagement: "12.3%",
    rating: 5.0,
    reviews: 45,
    specializations: ["Memecoins", "Community", "Viral Content"],
    isVerified: true,
    successfulCampaigns: 78,
    hourlyRate: "$100-200",
    responseTime: "< 30 min"
  }
];

export function FeaturedKOLs() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-6 text-secondary border-secondary/30 bg-secondary/10">
            Top Performers
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold mb-6">
            Featured <span className="text-gradient-gold">KOLs</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover verified crypto influencers with proven track records and exceptional performance metrics
          </p>
        </div>

        {/* KOL Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredKOLs.map((kol) => (
            <Card key={kol.id} className="glass-card card-hover border-0 overflow-hidden">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                      <AvatarImage src={kol.avatar} alt={kol.name} />
                      <AvatarFallback>{kol.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm">{kol.name}</h3>
                        {kol.isVerified && (
                          <CheckCircle className="h-4 w-4 text-crypto-blue" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{kol.handle}</p>
                    </div>
                  </div>
                  <Twitter className="h-4 w-4 text-crypto-blue" />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-primary" />
                    <span className="font-medium">{kol.followers}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-secondary" />
                    <span className="font-medium">{kol.engagement}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-primary fill-primary" />
                    <span className="font-medium">{kol.rating}</span>
                    <span className="text-muted-foreground">({kol.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3 text-crypto-blue" />
                    <span className="font-medium">{kol.responseTime}</span>
                  </div>
                </div>

                {/* Specializations */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {kol.specializations.slice(0, 3).map((spec) => (
                      <Badge 
                        key={spec} 
                        variant="secondary" 
                        className="text-xs px-2 py-0.5 bg-secondary/20 text-secondary border-secondary/30"
                      >
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="space-y-2 mb-4 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Campaigns:</span>
                    <span className="font-medium">{kol.successfulCampaigns}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rate:</span>
                    <span className="font-medium text-primary">{kol.hourlyRate}/hr</span>
                  </div>
                </div>

                {/* Action */}
                <Link to={`/kols/${kol.id}`}>
                  <Button 
                    className="w-full btn-secondary text-xs py-2 group"
                    size="sm"
                  >
                    View Profile
                    <Eye className="ml-1 h-3 w-3 group-hover:scale-110 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/kols">
            <Button size="lg" variant="outline" className="glass-card group">
              Explore All KOLs
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}