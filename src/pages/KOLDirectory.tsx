import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { 
  Search, 
  Filter, 
  Star, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  Twitter,
  MessageCircle,
  Eye,
  ArrowUpDown,
  Grid3X3,
  List
} from "lucide-react";

interface KOL {
  id: string;
  name: string;
  handle: string;
  avatar: string;
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
  languages: string[];
  chainFocus: string[];
  availabilityStatus: 'available' | 'busy' | 'unavailable';
  lastActive: string;
  portfolioItems: number;
}

const kolData: KOL[] = [
  {
    id: "1",
    name: "Alex Chen",
    handle: "@cryptoalex",
    avatar: "/avatars/alex.jpg",
    followers: "245K",
    followersCount: 245000,
    engagement: "8.2%",
    engagementRate: 8.2,
    rating: 4.9,
    reviews: 127,
    specializations: ["DeFi", "Layer 1", "Trading"],
    isVerified: true,
    successfulCampaigns: 89,
    hourlyRate: "$200-300",
    hourlyRateMin: 200,
    hourlyRateMax: 300,
    responseTime: "< 2 hours",
    location: "Singapore",
    languages: ["English", "Mandarin"],
    chainFocus: ["Ethereum", "Solana", "Polygon"],
    availabilityStatus: 'available',
    lastActive: "2 hours ago",
    portfolioItems: 15
  },
  {
    id: "2",
    name: "Sarah Williams",
    handle: "@defi_sarah",
    avatar: "/avatars/sarah.jpg",
    followers: "180K",
    followersCount: 180000,
    engagement: "9.1%",
    engagementRate: 9.1,
    rating: 4.8,
    reviews: 93,
    specializations: ["DeFi", "Yield Farming", "Protocols"],
    isVerified: true,
    successfulCampaigns: 67,
    hourlyRate: "$150-250",
    hourlyRateMin: 150,
    hourlyRateMax: 250,
    responseTime: "< 1 hour",
    location: "London",
    languages: ["English"],
    chainFocus: ["Ethereum", "Arbitrum", "Optimism"],
    availabilityStatus: 'available',
    lastActive: "1 hour ago",
    portfolioItems: 12
  },
  {
    id: "3",
    name: "Marcus Rodriguez",
    handle: "@nft_marcus",
    avatar: "/avatars/marcus.jpg",
    followers: "320K",
    followersCount: 320000,
    engagement: "7.8%",
    engagementRate: 7.8,
    rating: 4.7,
    reviews: 156,
    specializations: ["NFTs", "Gaming", "Metaverse"],
    isVerified: true,
    successfulCampaigns: 134,
    hourlyRate: "$250-400",
    hourlyRateMin: 250,
    hourlyRateMax: 400,
    responseTime: "< 3 hours",
    location: "Los Angeles",
    languages: ["English", "Spanish"],
    chainFocus: ["Ethereum", "Polygon", "Solana"],
    availabilityStatus: 'busy',
    lastActive: "30 minutes ago",
    portfolioItems: 22
  },
  {
    id: "4",
    name: "Emma Thompson",
    handle: "@crypto_emma",
    avatar: "/avatars/emma.jpg",
    followers: "95K",
    followersCount: 95000,
    engagement: "12.3%",
    engagementRate: 12.3,
    rating: 5.0,
    reviews: 45,
    specializations: ["Memecoins", "Community", "Viral Content"],
    isVerified: true,
    successfulCampaigns: 78,
    hourlyRate: "$100-200",
    hourlyRateMin: 100,
    hourlyRateMax: 200,
    responseTime: "< 30 min",
    location: "New York",
    languages: ["English"],
    chainFocus: ["Ethereum", "Base", "Solana"],
    availabilityStatus: 'available',
    lastActive: "15 minutes ago",
    portfolioItems: 9
  },
  // Add more KOLs...
];

export default function KOLDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    specializations: [] as string[],
    minFollowers: [0],
    maxRate: [500],
    availability: [] as string[],
    rating: [0],
    chainFocus: [] as string[]
  });

  const specializations = ["DeFi", "NFTs", "Gaming", "Memecoins", "Layer 1", "Trading", "Yield Farming", "Protocols", "Community", "Viral Content", "Metaverse"];
  const chains = ["Ethereum", "Solana", "Polygon", "Arbitrum", "Optimism", "Base", "BNB Chain"];

  // Filter and sort KOLs
  const filteredKOLs = kolData
    .filter(kol => {
      if (searchQuery && !kol.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !kol.handle.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (filters.specializations.length > 0 && 
          !filters.specializations.some(spec => kol.specializations.includes(spec))) {
        return false;
      }
      if (kol.followersCount < filters.minFollowers[0] * 1000) {
        return false;
      }
      if (kol.hourlyRateMax > filters.maxRate[0]) {
        return false;
      }
      if (filters.availability.length > 0 && !filters.availability.includes(kol.availabilityStatus)) {
        return false;
      }
      if (kol.rating < filters.rating[0]) {
        return false;
      }
      if (filters.chainFocus.length > 0 && 
          !filters.chainFocus.some(chain => kol.chainFocus.includes(chain))) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating': return b.rating - a.rating;
        case 'followers': return b.followersCount - a.followersCount;
        case 'engagement': return b.engagementRate - a.engagementRate;
        case 'price-low': return a.hourlyRateMin - b.hourlyRateMin;
        case 'price-high': return b.hourlyRateMax - a.hourlyRateMax;
        default: return 0;
      }
    });

  const KOLCard = ({ kol, isListView = false }: { kol: KOL; isListView?: boolean }) => (
    <Card className={`glass-card card-hover border-0 overflow-hidden ${isListView ? 'flex' : ''}`}>
      <CardContent className={`p-6 ${isListView ? 'flex items-center space-x-6 w-full' : ''}`}>
        {/* Header */}
        <div className={`flex items-start justify-between ${isListView ? 'w-64 flex-shrink-0' : 'mb-4'}`}>
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
              <Badge 
                variant={kol.availabilityStatus === 'available' ? 'default' : 'secondary'}
                className="text-xs mt-1"
              >
                {kol.availabilityStatus}
              </Badge>
            </div>
          </div>
          <Twitter className="h-4 w-4 text-crypto-blue" />
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-2 gap-4 text-xs ${isListView ? 'w-48 flex-shrink-0' : 'mb-4'}`}>
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
        <div className={`${isListView ? 'flex-1 mr-4' : 'mb-4'}`}>
          <div className="flex flex-wrap gap-1">
            {kol.specializations.slice(0, isListView ? 5 : 3).map((spec) => (
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

        {/* Metrics & Action */}
        <div className={`space-y-2 ${isListView ? 'w-48 flex-shrink-0' : ''}`}>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Campaigns:</span>
              <span className="font-medium">{kol.successfulCampaigns}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Rate:</span>
              <span className="font-medium text-primary">{kol.hourlyRate}/hr</span>
            </div>
          </div>
          
          <Link to={`/kols/${kol.id}`}>
            <Button 
              className="w-full btn-secondary text-xs py-2 group mt-2"
              size="sm"
            >
              View Profile
              <Eye className="ml-1 h-3 w-3 group-hover:scale-110 transition-transform" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={false} />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-mono font-bold mb-4">
            Discover <span className="text-gradient-gold">Verified KOLs</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Browse {kolData.length}+ verified crypto influencers and find the perfect match for your campaign
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 space-y-6">
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="h-4 w-4" />
                <h3 className="font-semibold">Filters</h3>
              </div>

              {/* Search */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name or handle..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Specializations */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Specializations</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto custom-scrollbar">
                    {specializations.map((spec) => (
                      <div key={spec} className="flex items-center space-x-2">
                        <Checkbox
                          id={spec}
                          checked={filters.specializations.includes(spec)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFilters(prev => ({
                                ...prev,
                                specializations: [...prev.specializations, spec]
                              }));
                            } else {
                              setFilters(prev => ({
                                ...prev,
                                specializations: prev.specializations.filter(s => s !== spec)
                              }));
                            }
                          }}
                        />
                        <label htmlFor={spec} className="text-sm">{spec}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Followers */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Min Followers: {filters.minFollowers[0]}K+
                  </label>
                  <Slider
                    value={filters.minFollowers}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, minFollowers: value }))}
                    max={1000}
                    step={10}
                    className="w-full"
                  />
                </div>

                {/* Rate */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Max Rate: ${filters.maxRate[0]}/hr
                  </label>
                  <Slider
                    value={filters.maxRate}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, maxRate: value }))}
                    max={500}
                    step={25}
                    className="w-full"
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Min Rating: {filters.rating[0]}+
                  </label>
                  <Slider
                    value={filters.rating}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, rating: value }))}
                    max={5}
                    step={0.5}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {filteredKOLs.length} KOLs found
                </span>
                
                {/* View Toggle */}
                <div className="flex items-center gap-1 glass-card p-1 rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="h-8 w-8 p-0"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="h-8 w-8 p-0"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="followers">Most Followers</SelectItem>
                    <SelectItem value="engagement">Best Engagement</SelectItem>
                    <SelectItem value="price-low">Lowest Price</SelectItem>
                    <SelectItem value="price-high">Highest Price</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* KOL Grid/List */}
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                : "space-y-4"
            }>
              {filteredKOLs.map((kol) => (
                <KOLCard key={kol.id} kol={kol} isListView={viewMode === 'list'} />
              ))}
            </div>

            {filteredKOLs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No KOLs match your current filters.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setFilters({
                    specializations: [],
                    minFollowers: [0],
                    maxRate: [500],
                    availability: [],
                    rating: [0],
                    chainFocus: []
                  })}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}