import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { 
  Search, 
  Filter, 
  Clock, 
  DollarSign, 
  Users, 
  Eye,
  Briefcase,
  MapPin,
  Calendar,
  TrendingUp,
  Star,
  Plus
} from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  budget: string;
  budgetMin: number;
  budgetMax: number;
  timeline: string;
  location: string;
  postedDate: string;
  applicants: number;
  description: string;
  requirements: string[];
  deliverables: string[];
  chains: string[];
  categories: string[];
  experienceLevel: 'entry' | 'intermediate' | 'expert';
  campaignType: 'one-time' | 'ongoing' | 'project-based';
  isUrgent: boolean;
  isFeatured: boolean;
}

const jobData: Job[] = [
  {
    id: "1",
    title: "DeFi Protocol Launch Campaign",
    company: "YieldMax Finance",
    companyLogo: "/company-logos/yieldmax.jpg",
    budget: "$15,000 - $25,000",
    budgetMin: 15000,
    budgetMax: 25000,
    timeline: "2-3 weeks",
    location: "Remote",
    postedDate: "2 hours ago",
    applicants: 23,
    description: "We're launching a revolutionary DeFi yield farming protocol and need top-tier KOLs to drive awareness and adoption. This campaign will focus on educational content, protocol tutorials, and community building.",
    requirements: [
      "50K+ followers with DeFi audience",
      "Previous DeFi campaign experience",
      "Strong engagement rates (>5%)",
      "Technical content creation ability"
    ],
    deliverables: [
      "5 educational Twitter threads",
      "2 video tutorials (YouTube/TikTok)",
      "1 Twitter Space AMA session",
      "Daily engagement for 2 weeks"
    ],
    chains: ["Ethereum", "Polygon"],
    categories: ["DeFi", "Yield Farming", "Education"],
    experienceLevel: 'expert',
    campaignType: 'project-based',
    isUrgent: true,
    isFeatured: true
  },
  {
    id: "2",
    title: "NFT Collection Marketing Push",
    company: "ArtChain Studios",
    companyLogo: "/company-logos/artchain.jpg",
    budget: "$8,000 - $12,000",
    budgetMin: 8000,
    budgetMax: 12000,
    timeline: "1 week",
    location: "Remote",
    postedDate: "5 hours ago",
    applicants: 31,
    description: "Seeking creative KOLs to promote our upcoming generative art NFT collection. Focus on art communities, collectors, and NFT enthusiasts.",
    requirements: [
      "25K+ followers interested in NFTs/Art",
      "Previous NFT promotion experience",
      "Creative content creation skills",
      "Art community connections"
    ],
    deliverables: [
      "3 promotional posts with custom graphics",
      "1 collection review video",
      "Stories/Reels showcasing artwork",
      "Discord community engagement"
    ],
    chains: ["Ethereum", "Solana"],
    categories: ["NFTs", "Art", "Collectibles"],
    experienceLevel: 'intermediate',
    campaignType: 'one-time',
    isUrgent: false,
    isFeatured: false
  },
  {
    id: "3",
    title: "Memecoin Community Building",
    company: "DogeRocket",
    companyLogo: "/company-logos/dogerocket.jpg",
    budget: "$5,000 - $8,000",
    budgetMin: 5000,
    budgetMax: 8000,
    timeline: "Ongoing",
    location: "Remote",
    postedDate: "1 day ago",
    applicants: 67,
    description: "Looking for fun, engaging KOLs to help build our memecoin community. Must have experience with viral content and meme culture.",
    requirements: [
      "Strong meme game and humor",
      "Active in crypto Twitter",
      "Experience with viral content",
      "Community building skills"
    ],
    deliverables: [
      "Daily meme posts",
      "Community engagement",
      "Viral content creation",
      "Telegram/Discord participation"
    ],
    chains: ["Solana", "Base"],
    categories: ["Memecoins", "Community", "Viral Content"],
    experienceLevel: 'entry',
    campaignType: 'ongoing',
    isUrgent: false,
    isFeatured: false
  }
];

export default function JobBoard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filters, setFilters] = useState({
    categories: [] as string[],
    budgetRange: [0],
    experienceLevel: [] as string[],
    campaignType: [] as string[],
    chains: [] as string[]
  });

  const categories = ["DeFi", "NFTs", "Gaming", "Memecoins", "Layer 1", "Trading", "Yield Farming", "Art", "Collectibles", "Community", "Viral Content", "Education"];
  const chains = ["Ethereum", "Solana", "Polygon", "Arbitrum", "Optimism", "Base", "BNB Chain"];
  const experienceLevels = ["entry", "intermediate", "expert"];
  const campaignTypes = ["one-time", "ongoing", "project-based"];

  // Filter and sort jobs
  const filteredJobs = jobData
    .filter(job => {
      if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !job.company.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (filters.categories.length > 0 && 
          !filters.categories.some(cat => job.categories.includes(cat))) {
        return false;
      }
      if (job.budgetMin < filters.budgetRange[0] * 1000) {
        return false;
      }
      if (filters.experienceLevel.length > 0 && !filters.experienceLevel.includes(job.experienceLevel)) {
        return false;
      }
      if (filters.campaignType.length > 0 && !filters.campaignType.includes(job.campaignType)) {
        return false;
      }
      if (filters.chains.length > 0 && 
          !filters.chains.some(chain => job.chains.includes(chain))) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest': return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
        case 'budget-high': return b.budgetMax - a.budgetMax;
        case 'budget-low': return a.budgetMin - b.budgetMin;
        case 'applicants': return b.applicants - a.applicants;
        default: return 0;
      }
    });

  const JobCard = ({ job }: { job: Job }) => (
    <Card className="glass-card card-hover border-0 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <CardTitle className="text-lg">{job.title}</CardTitle>
                {job.isFeatured && (
                  <Badge variant="default" className="bg-primary text-primary-foreground">
                    Featured
                  </Badge>
                )}
                {job.isUrgent && (
                  <Badge variant="destructive">
                    Urgent
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{job.company}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="glass-card">
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Key Info */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <span className="font-medium">{job.budget}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-secondary" />
            <span>{job.timeline}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-crypto-blue" />
            <span>{job.applicants} applicants</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {job.description}
        </p>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {job.categories.map((category) => (
            <Badge 
              key={category} 
              variant="secondary" 
              className="text-xs bg-secondary/20 text-secondary border-secondary/30"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Requirements Preview */}
        <div>
          <h4 className="text-sm font-medium mb-2">Key Requirements:</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            {job.requirements.slice(0, 2).map((req, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary" />
                {req}
              </li>
            ))}
            {job.requirements.length > 2 && (
              <li className="text-primary">+{job.requirements.length - 2} more requirements</li>
            )}
          </ul>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>Posted {job.postedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className={`text-xs capitalize ${
                job.experienceLevel === 'expert' 
                  ? 'border-primary/30 text-primary' 
                  : job.experienceLevel === 'intermediate'
                  ? 'border-secondary/30 text-secondary'
                  : 'border-muted-foreground/30 text-muted-foreground'
              }`}
            >
              {job.experienceLevel}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={false} />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-mono font-bold mb-4">
              Job <span className="text-gradient-gold">Board</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover {jobData.length}+ active campaigns from verified crypto projects
            </p>
          </div>
          
          <Button className="btn-hero">
            <Plus className="h-4 w-4 mr-2" />
            Post a Job
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 space-y-6">
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="h-4 w-4" />
                <h3 className="font-semibold">Filters</h3>
              </div>

              <div className="space-y-4">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search jobs or companies..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Categories</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto custom-scrollbar">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={filters.categories.includes(category)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFilters(prev => ({
                                ...prev,
                                categories: [...prev.categories, category]
                              }));
                            } else {
                              setFilters(prev => ({
                                ...prev,
                                categories: prev.categories.filter(c => c !== category)
                              }));
                            }
                          }}
                        />
                        <label htmlFor={category} className="text-sm">{category}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Min Budget: ${filters.budgetRange[0]}K+
                  </label>
                  <Slider
                    value={filters.budgetRange}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, budgetRange: value }))}
                    max={50}
                    step={5}
                    className="w-full"
                  />
                </div>

                {/* Experience Level */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Experience Level</label>
                  <div className="space-y-2">
                    {experienceLevels.map((level) => (
                      <div key={level} className="flex items-center space-x-2">
                        <Checkbox
                          id={level}
                          checked={filters.experienceLevel.includes(level)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFilters(prev => ({
                                ...prev,
                                experienceLevel: [...prev.experienceLevel, level]
                              }));
                            } else {
                              setFilters(prev => ({
                                ...prev,
                                experienceLevel: prev.experienceLevel.filter(l => l !== level)
                              }));
                            }
                          }}
                        />
                        <label htmlFor={level} className="text-sm capitalize">{level}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-4">Market Insights</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Avg Budget</span>
                  <span className="font-medium text-primary">$12,500</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Active Jobs</span>
                  <span className="font-medium">{jobData.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Avg Applications</span>
                  <span className="font-medium">24</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <span className="text-sm text-muted-foreground">
                {filteredJobs.length} jobs found
              </span>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="budget-high">Highest Budget</SelectItem>
                    <SelectItem value="budget-low">Lowest Budget</SelectItem>
                    <SelectItem value="applicants">Most Applied</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Job Grid */}
            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No jobs match your current filters.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setFilters({
                    categories: [],
                    budgetRange: [0],
                    experienceLevel: [],
                    campaignType: [],
                    chains: []
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