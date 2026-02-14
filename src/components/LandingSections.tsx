"use client";

import dynamic from "next/dynamic";
import LazyMount from "@/components/LazyMount";

const LogosCarousel = dynamic(() => import("@/components/LogosCarousel"), {
  ssr: false,
});
const ProblemSection = dynamic(() => import("@/components/ProblemSection"), {
  ssr: false,
});
const SolutionSection = dynamic(() => import("@/components/SolutionSection"), {
  ssr: false,
});
const CapabilitiesCarouselSection = dynamic(
  () => import("@/components/CapabilitiesCarouselSection"),
  { ssr: false }
);
const DemoSection = dynamic(() => import("@/components/DemoSection"), {
  ssr: false,
});
const MetricsSection = dynamic(() => import("@/components/MetricsSection"), {
  ssr: false,
});
const AudienceSection = dynamic(() => import("@/components/AudienceSection"), {
  ssr: false,
});
const CTASection = dynamic(() => import("@/components/CTASection"), {
  ssr: false,
});

export default function LandingSections() {
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
