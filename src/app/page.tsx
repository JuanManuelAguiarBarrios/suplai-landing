import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LandingSections from "@/components/LandingSections";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";

export default function Home() {
  return (
    <MotionProvider>
      <main className="relative overflow-x-hidden bg-white text-slate-900">
        <Navbar />
        <HeroSection />
        <LandingSections />
        <Footer />
      </main>
    </MotionProvider>
  );
}
