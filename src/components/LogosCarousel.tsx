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
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p className="text-center text-xs font-medium text-slate-400 uppercase tracking-[0.2em] mb-10">
          Empresas que confían en la automatización
        </p>

        <div className="fade-mask">
          <div className="flex animate-scroll-left">
            {[...logos, ...logos].map((logo, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 mx-10 flex items-center justify-center group"
              >
                <div className="flex items-center gap-2.5 opacity-25 group-hover:opacity-60 transition-all duration-500 group-hover:scale-105">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[rgba(45,68,204,0.08)] to-[rgba(115,175,255,0.08)] border border-[rgba(45,68,204,0.12)] flex items-center justify-center group-hover:border-[rgba(45,68,204,0.25)] transition-colors duration-500">
                    <span className="text-[10px] font-bold text-slate-500 group-hover:text-[rgb(45,68,204)] transition-colors duration-500">
                      {logo.charAt(0)}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-slate-600 whitespace-nowrap">
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
