import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  TrendingUp, 
  Shield, 
  ArrowRight,
  Star,
  CheckCircle
} from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="KOLHub - Crypto Influencer Marketplace" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/80 to-background/90" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-full blur-xl" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <Badge variant="outline" className="mb-6 text-primary border-primary/30 bg-primary/10 px-4 py-1">
            <CheckCircle className="w-3 h-3 mr-2" />
            Trusted by 10,000+ Projects & KOLs
          </Badge>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-mono font-bold mb-6 leading-tight">
            The Premier
            <span className="block text-gradient-gold">Crypto KOL</span>
            <span className="block text-gradient-emerald">Marketplace</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect verified crypto influencers with projects seeking authentic marketing talent. 
            Build trust, drive results, and scale your presence in the crypto ecosystem.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/auth?type=kol">
              <Button 
                size="lg" 
                className="btn-secondary text-lg px-8 py-6 w-full sm:w-auto group"
              >
                Join as KOL
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link to="/auth?type=project">
              <Button 
                size="lg" 
                className="btn-hero text-lg px-8 py-6 w-full sm:w-auto group"
              >
                Post a Job
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="glass-card p-6 text-center card-hover">
              <Users className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-gradient-gold">5,000+</div>
              <div className="text-sm text-muted-foreground">Verified KOLs</div>
            </div>
            
            <div className="glass-card p-6 text-center card-hover">
              <TrendingUp className="h-8 w-8 text-secondary mx-auto mb-3" />
              <div className="text-2xl font-bold text-gradient-emerald">$50M+</div>
              <div className="text-sm text-muted-foreground">Campaigns Completed</div>
            </div>
            
            <div className="glass-card p-6 text-center card-hover">
              <Shield className="h-8 w-8 text-crypto-blue mx-auto mb-3" />
              <div className="text-2xl font-bold text-blue-400">99.2%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-primary fill-primary" />
              <span className="text-sm">4.9/5 Average Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-secondary" />
              <span className="text-sm">Secure Escrow System</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-crypto-blue" />
              <span className="text-sm">Verified Profiles Only</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}