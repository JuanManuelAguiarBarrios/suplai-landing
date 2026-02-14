"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const logos = [
  "Logistica Express",
  "TransCarga",
  "Puerto Sur",
  "DistribuiMax",
  "FlotaYA",
  "CargoNet",
  "EnvioRapido",
  "LogiTrack",
];

export default function LogosCarousel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative py-14 md:py-16 overflow-hidden bg-white">
      <div className="section-divider mb-12" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75 }}
      >
        <p className="text-center text-[11px] font-semibold text-slate-500 uppercase tracking-[0.2em] mb-8">
          Operadores y equipos que ya automatizan su seguimiento
        </p>

        <div className="fade-mask">
          <div className="flex animate-scroll-left">
            {[...logos, ...logos].map((logo, idx) => (
              <div
                key={`${logo}-${idx}`}
                className="flex-shrink-0 mx-4 sm:mx-5 md:mx-6 flex items-center justify-center"
              >
                <div className="inline-flex items-center gap-2.5 rounded-full border border-[rgba(45,68,204,0.2)] bg-[rgba(245,248,255,0.9)] px-4 py-2.5">
                  <span className="inline-flex h-6 w-6 rounded-full bg-[rgba(45,68,204,0.1)] border border-[rgba(45,68,204,0.16)] items-center justify-center text-[10px] font-semibold text-[rgb(45,68,204)]">
                    {logo.charAt(0)}
                  </span>
                  <span className="text-[13px] font-medium text-slate-600 whitespace-nowrap">
                    {logo}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
