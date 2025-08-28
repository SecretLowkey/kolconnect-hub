import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  UserCheck, 
  Search, 
  MessageSquare, 
  Shield, 
  TrendingUp, 
  CheckCircle,
  ArrowDown
} from "lucide-react";

interface Step {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  details: string[];
}

const stepsForProjects: Step[] = [
  {
    number: "01",
    title: "Post Your Campaign",
    description: "Create detailed job postings with clear requirements, budget, and timeline",
    icon: <MessageSquare className="h-8 w-8" />,
    color: "primary",
    details: [
      "Define campaign objectives",
      "Set budget and timeline", 
      "Specify deliverables",
      "Choose target audience"
    ]
  },
  {
    number: "02", 
    title: "Discover KOLs",
    description: "Browse verified influencers, filter by niche, and review performance metrics",
    icon: <Search className="h-8 w-8" />,
    color: "secondary",
    details: [
      "Browse verified profiles",
      "Filter by specialization",
      "Check engagement rates",
      "Review past performance"
    ]
  },
  {
    number: "03",
    title: "Secure Collaboration", 
    description: "Negotiate terms, finalize contracts, and fund escrow for secure payments",
    icon: <Shield className="h-8 w-8" />,
    color: "crypto-blue",
    details: [
      "Negotiate rates and terms",
      "Sign smart contracts",
      "Fund secure escrow",
      "Set milestone goals"
    ]
  },
  {
    number: "04",
    title: "Track & Optimize",
    description: "Monitor real-time performance metrics and optimize campaigns for maximum ROI",
    icon: <TrendingUp className="h-8 w-8" />,
    color: "crypto-purple",
    details: [
      "Real-time analytics",
      "Performance tracking",
      "ROI optimization",
      "Milestone releases"
    ]
  }
];

const stepsForKOLs: Step[] = [
  {
    number: "01",
    title: "Get Verified",
    description: "Connect your social accounts and complete our verification process",
    icon: <UserCheck className="h-8 w-8" />,
    color: "primary",
    details: [
      "Connect Twitter/social accounts",
      "Verify follower authenticity",
      "Complete KYC process",
      "Earn verification badge"
    ]
  },
  {
    number: "02",
    title: "Build Your Profile", 
    description: "Showcase your expertise, past work, and set your rates",
    icon: <MessageSquare className="h-8 w-8" />,
    color: "secondary",
    details: [
      "Highlight specializations",
      "Upload portfolio",
      "Set hourly rates",
      "Display testimonials"
    ]
  },
  {
    number: "03",
    title: "Find Opportunities",
    description: "Browse relevant campaigns and submit compelling proposals",
    icon: <Search className="h-8 w-8" />,
    color: "crypto-blue", 
    details: [
      "Browse matching jobs",
      "Submit proposals",
      "Negotiate terms",
      "Accept contracts"
    ]
  },
  {
    number: "04",
    title: "Deliver & Earn",
    description: "Execute campaigns, hit milestones, and receive secure payments",
    icon: <CheckCircle className="h-8 w-8" />,
    color: "crypto-purple",
    details: [
      "Execute campaigns",
      "Meet deliverables",
      "Track performance",
      "Receive payments"
    ]
  }
];

interface HowItWorksProps {
  userType?: 'project' | 'kol';
}

export function HowItWorks({ userType = 'project' }: HowItWorksProps) {
  const steps = userType === 'project' ? stepsForProjects : stepsForKOLs;
  const title = userType === 'project' ? 'For Projects' : 'For KOLs';

  return (
    <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-6 text-crypto-blue border-crypto-blue/30 bg-crypto-blue/10">
            How It Works
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold mb-6">
            Simple Process, <span className="text-gradient-gold">Powerful Results</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Get started in minutes with our streamlined process designed for both projects and KOLs
          </p>
          
          {/* Toggle Pills */}
          <div className="flex justify-center space-x-2">
            <Badge 
              variant={userType === 'project' ? 'default' : 'outline'}
              className={`px-4 py-2 cursor-pointer transition-all ${
                userType === 'project' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-transparent border-border/50 hover:border-primary/50'
              }`}
            >
              For Projects
            </Badge>
            <Badge 
              variant={userType === 'kol' ? 'default' : 'outline'}
              className={`px-4 py-2 cursor-pointer transition-all ${
                userType === 'kol' 
                  ? 'bg-secondary text-secondary-foreground' 
                  : 'bg-transparent border-border/50 hover:border-secondary/50'
              }`}
            >
              For KOLs
            </Badge>
          </div>
        </div>

        {/* Steps */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <Card className="glass-card border-0 h-full card-hover">
                  <CardContent className="p-6">
                    {/* Step Number */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-mono font-bold text-muted-foreground/50">
                        {step.number}
                      </span>
                      <div className={`text-${step.color}`}>
                        {step.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {step.description}
                    </p>

                    {/* Details */}
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center text-xs text-muted-foreground">
                          <CheckCircle className="h-3 w-3 text-secondary mr-2 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Arrow (hidden on mobile, shown on desktop for all but last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                      <ArrowDown className="h-3 w-3 text-primary rotate-90" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to {userType === 'project' ? 'Launch Your Campaign' : 'Start Earning'}?
            </h3>
            <p className="text-muted-foreground mb-6">
              {userType === 'project' 
                ? 'Join thousands of successful projects that have scaled their marketing with verified KOLs'
                : 'Connect with top crypto projects and monetize your influence with transparent, secure payments'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Badge variant="outline" className="text-primary border-primary/30 bg-primary/10 px-4 py-2">
                <CheckCircle className="w-3 h-3 mr-2" />
                No Setup Fees
              </Badge>
              <Badge variant="outline" className="text-secondary border-secondary/30 bg-secondary/10 px-4 py-2">
                <Shield className="w-3 h-3 mr-2" />
                Secure Escrow
              </Badge>
              <Badge variant="outline" className="text-crypto-blue border-crypto-blue/30 bg-crypto-blue/10 px-4 py-2">
                <TrendingUp className="w-3 h-3 mr-2" />
                Real-time Analytics
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}