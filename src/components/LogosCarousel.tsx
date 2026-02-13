"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const logos = [
  "Logística Express",
  "TransCarga",
  "Puerto Sur",
  "DistribuiMax",
  "FlotaYA",
  "CargoNet",
  "EnvíoRápido",
  "LogiTrack",
];

export default function LogosCarousel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative py-16 overflow-hidden">
      <div className="section-divider mb-16" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p className="text-center text-xs font-medium text-gray-500 uppercase tracking-[0.2em] mb-10">
          Empresas que confían en la automatización
        </p>

        <div className="fade-mask">
          <div className="flex animate-scroll-left">
            {[...logos, ...logos].map((logo, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 mx-10 flex items-center justify-center"
              >
                <div className="flex items-center gap-2.5 opacity-30 hover:opacity-60 transition-opacity duration-500">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                    <span className="text-[10px] font-bold text-gray-400">
                      {logo.charAt(0)}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-400 whitespace-nowrap">
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
