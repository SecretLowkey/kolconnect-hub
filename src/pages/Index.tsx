import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedKOLs } from "@/components/home/FeaturedKOLs";
import { HowItWorks } from "@/components/home/HowItWorks";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturedKOLs />
        <HowItWorks />
      </main>
    </div>
  );
};

export default Index;
