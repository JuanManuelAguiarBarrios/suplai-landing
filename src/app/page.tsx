import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LandingSections from "@/components/LandingSections";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden bg-white text-slate-900">
      <Navbar />
      <HeroSection />
      <LandingSections />
      <Footer />
    </main>
  );
}
