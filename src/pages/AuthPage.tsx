import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/hooks/useAuth';
import { toast } from "sonner";
import { 
  Twitter, 
  Shield, 
  CheckCircle, 
  Users, 
  TrendingUp, 
  DollarSign,
  ArrowRight,
  Wallet,
  Link as LinkIcon
} from "lucide-react";

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(searchParams.get('type') || 'kol');
  const { isAuthenticated, user, signInWithTwitter } = useAuth();

  useEffect(() => {
    const type = searchParams.get('type');
    if (type && (type === 'kol' || type === 'project')) {
      setActiveTab(type);
    }
  }, [searchParams]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user?.profile) {
      const dashboardPath = user.profile.user_type === 'kol' ? '/dashboard/kol' : '/dashboard/project';
      navigate(dashboardPath);
    }
  }, [isAuthenticated, user, navigate]);

  const handleAuth = async (method: 'twitter' | 'wallet') => {
    console.log('🔥 handleAuth called with method:', method, 'activeTab:', activeTab);
    
    if (method === 'twitter') {
      try {
        console.log('🚀 Starting Twitter authentication for:', activeTab);
        console.log('🌍 Current window location:', window.location.href);
        console.log('🌐 Current origin:', window.location.origin);
        
        const { error } = await signInWithTwitter(activeTab as 'kol' | 'project');
        
        if (error) {
          console.error('❌ Authentication error full object:', error);
          console.error('❌ Error message:', error.message);
          console.error('❌ Error status:', error.status);
          toast.error(`Failed to sign in with Twitter: ${error.message || 'Please check Supabase configuration.'}`);
        } else {
          console.log('✅ Twitter sign in initiated successfully!');
        }
      } catch (error) {
        console.error('❌ Unexpected sign in error:', error);
        toast.error('An unexpected error occurred. Please try again.');
      }
    } else {
      toast.info('Wallet authentication coming soon!');
    }
  };

  const KOLSignup = () => (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Join as a <span className="text-gradient-emerald">KOL</span></h2>
        <p className="text-muted-foreground">
          Connect with top crypto projects and monetize your influence
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="glass-card p-4">
          <TrendingUp className="h-6 w-6 text-secondary mb-2" />
          <h3 className="font-semibold mb-1">High-Paying Campaigns</h3>
          <p className="text-sm text-muted-foreground">Access premium campaigns with rates up to $500/hour</p>
        </div>
        <div className="glass-card p-4">
          <Shield className="h-6 w-6 text-crypto-blue mb-2" />
          <h3 className="font-semibold mb-1">Secure Payments</h3>
          <p className="text-sm text-muted-foreground">Guaranteed payments through smart contract escrow</p>
        </div>
        <div className="glass-card p-4">
          <Users className="h-6 w-6 text-primary mb-2" />
          <h3 className="font-semibold mb-1">Quality Projects</h3>
          <p className="text-sm text-muted-foreground">Work with verified projects and legitimate teams</p>
        </div>
        <div className="glass-card p-4">
          <CheckCircle className="h-6 w-6 text-secondary mb-2" />
          <h3 className="font-semibold mb-1">Verified Profile</h3>
          <p className="text-sm text-muted-foreground">Build trust with official verification badges</p>
        </div>
      </div>

      {/* Auth Options */}
      <div className="space-y-4">
        <Button 
          className="w-full btn-secondary h-12 text-base"
          onClick={() => handleAuth('twitter')}
        >
          <Twitter className="h-5 w-5 mr-3" />
          Continue with Twitter
          <ArrowRight className="h-4 w-4 ml-auto" />
        </Button>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/50" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        <Button 
          variant="outline" 
          className="w-full glass-card h-12 text-base"
          onClick={() => handleAuth('wallet')}
        >
          <Wallet className="h-5 w-5 mr-3" />
          Connect Wallet
          <ArrowRight className="h-4 w-4 ml-auto" />
        </Button>
      </div>

      {/* Requirements */}
      <div className="glass-card p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-secondary" />
          Requirements to Join
        </h3>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-primary" />
            Active Twitter account with 1K+ crypto-focused followers
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-primary" />
            Genuine engagement and community interaction
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-primary" />
            Professional conduct and reliable communication
          </li>
        </ul>
      </div>
    </div>
  );

  const ProjectSignup = () => (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Post as a <span className="text-gradient-gold">Project</span></h2>
        <p className="text-muted-foreground">
          Find verified crypto influencers to amplify your project
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="glass-card p-4">
          <Users className="h-6 w-6 text-primary mb-2" />
          <h3 className="font-semibold mb-1">Verified KOLs</h3>
          <p className="text-sm text-muted-foreground">Access to 5,000+ verified crypto influencers</p>
        </div>
        <div className="glass-card p-4">
          <TrendingUp className="h-6 w-6 text-secondary mb-2" />
          <h3 className="font-semibold mb-1">Performance Tracking</h3>
          <p className="text-sm text-muted-foreground">Real-time analytics and ROI measurement</p>
        </div>
        <div className="glass-card p-4">
          <Shield className="h-6 w-6 text-crypto-blue mb-2" />
          <h3 className="font-semibold mb-1">Secure Escrow</h3>
          <p className="text-sm text-muted-foreground">Milestone-based payments with dispute protection</p>
        </div>
        <div className="glass-card p-4">
          <DollarSign className="h-6 w-6 text-primary mb-2" />
          <h3 className="font-semibold mb-1">Transparent Pricing</h3>
          <p className="text-sm text-muted-foreground">Clear rates and no hidden fees</p>
        </div>
      </div>

      {/* Auth Options */}
      <div className="space-y-4">
        <Button 
          className="w-full btn-hero h-12 text-base"
          onClick={() => handleAuth('twitter')}
        >
          <Twitter className="h-5 w-5 mr-3" />
          Continue with Twitter
          <ArrowRight className="h-4 w-4 ml-auto" />
        </Button>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/50" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        <Button 
          variant="outline" 
          className="w-full glass-card h-12 text-base"
          onClick={() => handleAuth('wallet')}
        >
          <Wallet className="h-5 w-5 mr-3" />
          Connect Wallet
          <ArrowRight className="h-4 w-4 ml-auto" />
        </Button>
      </div>

      {/* Enterprise Option */}
      <div className="glass-card p-4 border-primary/30 bg-primary/5">
        <div className="flex items-start gap-3">
          <LinkIcon className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-semibold text-primary mb-1">Enterprise Solutions</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Need managed campaigns or bulk KOL partnerships? Our enterprise team can help.
            </p>
            <Button variant="outline" size="sm" className="border-primary/30 text-primary">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-md mx-auto">
          <Card className="glass-card border-0">
            <CardHeader className="text-center pb-2">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-black font-bold text-sm">KH</span>
                </div>
                <span className="text-xl font-mono font-bold text-gradient-gold">KOLHub</span>
              </div>
              <CardTitle className="text-2xl">Join the Premier Crypto KOL Marketplace</CardTitle>
            </CardHeader>

            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 glass-card">
                  <TabsTrigger value="kol" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    KOL
                  </TabsTrigger>
                  <TabsTrigger value="project" className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Project
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="kol">
                  <KOLSignup />
                </TabsContent>

                <TabsContent value="project">
                  <ProjectSignup />
                </TabsContent>
              </Tabs>

              {/* Trust Indicators */}
              <div className="mt-8 pt-6 border-t border-border/50">
                <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3 text-crypto-blue" />
                    <span>Secure Platform</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-secondary" />
                    <span>Verified Users</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-primary" />
                    <span>10K+ Members</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground mb-2">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
            <p className="text-xs text-muted-foreground">
              Already have an account?{" "}
              <button className="text-primary hover:underline">Sign in</button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}