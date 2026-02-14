import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LogosCarousel from "@/components/LogosCarousel";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import CapabilitiesCarouselSection from "@/components/CapabilitiesCarouselSection";
import DemoSection from "@/components/DemoSection";
import AudienceSection from "@/components/AudienceSection";
import MetricsSection from "@/components/MetricsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden bg-white text-slate-900">
      <Navbar />
      <HeroSection />
      <LogosCarousel />
      <ProblemSection />
      <SolutionSection />
      <CapabilitiesCarouselSection />
      <DemoSection />
      <MetricsSection />
      <AudienceSection />
      <CTASection />
      <Footer />
    </main>
  );
}
