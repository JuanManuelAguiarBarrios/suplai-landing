"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="cta" className="relative py-40 px-6 lg:px-8 grain-overlay" ref={ref}>
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.06, 0.12, 0.06],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[rgb(45,68,204)] rounded-full blur-[220px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 0.9, 1.2],
            opacity: [0.04, 0.1, 0.04],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[rgb(115,175,255)] rounded-full blur-[180px]"
        />
      </div>

      {/* Decorative animated lines */}
      <div className="absolute top-[25%] left-0 right-0 h-px overflow-hidden opacity-10">
        <div className="animate-line-flow h-full bg-gradient-to-r from-transparent via-[rgb(45,68,204)] to-transparent" />
      </div>
      <div className="absolute bottom-[25%] left-0 right-0 h-px overflow-hidden opacity-10">
        <div className="animate-line-flow h-full bg-gradient-to-r from-transparent via-[rgb(115,175,255)] to-transparent" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-[3rem] font-bold leading-[1.1] tracking-[-0.02em] mb-7">
            Dejá que la IA haga el{" "}
            <span className="gradient-text">seguimiento por vos</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-xl mx-auto font-light leading-relaxed">
            Sumate a las empresas que ya automatizan sus operaciones logísticas
            con Suplai.
          </p>

          <motion.a
            href="mailto:contacto@suplai.com"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 glow-button px-10 py-4 rounded-2xl text-white font-semibold text-lg group"
          >
            Agendar una demo
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1.5 transition-transform duration-300"
            />
          </motion.a>

          <p className="text-[12px] text-slate-400 mt-8 tracking-wide">
            Sin compromiso · Respuesta en 24hs · Demo personalizada
          </p>
        </motion.div>
      </div>
    </section>
  );
}
