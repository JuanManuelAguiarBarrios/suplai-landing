import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";

const LogosCarousel = dynamic(() => import("@/components/LogosCarousel"));
const ProblemSection = dynamic(() => import("@/components/ProblemSection"));
const SolutionSection = dynamic(() => import("@/components/SolutionSection"));
const CapabilitiesCarouselSection = dynamic(
  () => import("@/components/CapabilitiesCarouselSection")
);
const DemoSection = dynamic(() => import("@/components/DemoSection"));
const MetricsSection = dynamic(() => import("@/components/MetricsSection"));
const AudienceSection = dynamic(() => import("@/components/AudienceSection"));
const CTASection = dynamic(() => import("@/components/CTASection"));

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
