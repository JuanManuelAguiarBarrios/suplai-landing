import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LogosCarousel from "@/components/LogosCarousel";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import ProductSection from "@/components/ProductSection";
import DemoSection from "@/components/DemoSection";
import AudienceSection from "@/components/AudienceSection";
import MetricsSection from "@/components/MetricsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <LogosCarousel />
      <ProblemSection />
      <SolutionSection />
      <ProductSection />
      <DemoSection />
      <AudienceSection />
      <MetricsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
