"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import LazyMount from "@/components/LazyMount";

const loadLogosCarousel = () => import("@/components/LogosCarousel");
const loadProblemSection = () => import("@/components/ProblemSection");
const loadSolutionSection = () => import("@/components/SolutionSection");
const loadCapabilitiesCarouselSection = () =>
  import("@/components/CapabilitiesCarouselSection");
const loadDemoSection = () => import("@/components/DemoSection");
const loadMetricsSection = () => import("@/components/MetricsSection");
const loadAudienceSection = () => import("@/components/AudienceSection");
const loadCTASection = () => import("@/components/CTASection");

const LogosCarousel = dynamic(loadLogosCarousel, {
  ssr: false,
});
const ProblemSection = dynamic(loadProblemSection, {
  ssr: false,
});
const SolutionSection = dynamic(loadSolutionSection, {
  ssr: false,
});
const CapabilitiesCarouselSection = dynamic(loadCapabilitiesCarouselSection, {
  ssr: false,
});
const DemoSection = dynamic(loadDemoSection, {
  ssr: false,
});
const MetricsSection = dynamic(loadMetricsSection, {
  ssr: false,
});
const AudienceSection = dynamic(loadAudienceSection, {
  ssr: false,
});
const CTASection = dynamic(loadCTASection, {
  ssr: false,
});

export default function LandingSections() {
  useEffect(() => {
    const preload = () => {
      void loadLogosCarousel();
      void loadProblemSection();
      void loadSolutionSection();
      void loadCapabilitiesCarouselSection();
      void loadDemoSection();
      void loadMetricsSection();
      void loadAudienceSection();
      void loadCTASection();
    };

    const timeoutId = window.setTimeout(preload, 900);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <LazyMount minHeight={120} rootMargin="240px 0px">
        <LogosCarousel />
      </LazyMount>
      <LazyMount anchorId="problema" minHeight={780} rootMargin="280px 0px">
        <ProblemSection />
      </LazyMount>
      <LazyMount anchorId="solucion" minHeight={860} rootMargin="280px 0px">
        <SolutionSection />
      </LazyMount>
      <LazyMount anchorId="producto" minHeight={860} rootMargin="320px 0px">
        <CapabilitiesCarouselSection />
      </LazyMount>
      <LazyMount anchorId="demo" minHeight={1120} rootMargin="360px 0px">
        <DemoSection />
      </LazyMount>
      <LazyMount anchorId="metricas" minHeight={760} rootMargin="320px 0px">
        <MetricsSection />
      </LazyMount>
      <LazyMount minHeight={860} rootMargin="320px 0px">
        <AudienceSection />
      </LazyMount>
      <LazyMount anchorId="cta" minHeight={620} rootMargin="320px 0px">
        <CTASection />
      </LazyMount>
    </>
  );
}
