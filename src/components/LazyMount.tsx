"use client";

import { useEffect, useRef, useState } from "react";

type LazyMountProps = {
  children: React.ReactNode;
  minHeight?: number;
  rootMargin?: string;
  anchorId?: string;
};

export default function LazyMount({
  children,
  minHeight = 760,
  rootMargin = "320px 0px",
  anchorId,
}: LazyMountProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) return;
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(frame);
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          frame = requestAnimationFrame(() => setMounted(true));
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [mounted, rootMargin]);

  return (
    <div ref={ref} id={mounted ? undefined : anchorId}>
      {mounted ? children : <div aria-hidden="true" style={{ minHeight }} />}
    </div>
  );
}
