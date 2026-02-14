"use client";

import { m as motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="cta"
      className="deferred-section relative py-28 md:py-32 px-6 lg:px-8 overflow-hidden bg-[linear-gradient(180deg,#061127_0%,#08142f_100%)]"
      ref={ref}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[rgba(45,68,204,0.35)] blur-[150px]" />
        <div className="absolute -bottom-40 right-0 w-[460px] h-[460px] rounded-full bg-[rgba(115,175,255,0.2)] blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:46px_46px]" />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={
            shouldReduceMotion
              ? { opacity: 0, y: 12 }
              : { opacity: 0, y: 30, scale: 0.97 }
          }
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[30px] border border-white/16 bg-white/8 backdrop-blur-xl px-6 py-11 md:px-10 md:py-12"
        >
          <div className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/78 mb-6">
            Coordinación inteligente
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[2.95rem] leading-[1.08] tracking-[-0.02em] text-white mb-6">
            Deja que la IA haga el <span className="text-[rgb(161,203,255)]">seguimiento por vos</span>
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl mx-auto leading-relaxed">
            Sumate a las empresas que ya automatizan sus operaciones logisticas con Suplai.
          </p>

          <motion.a
            href="mailto:contacto@suplai.com"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 glow-button px-10 py-4 rounded-2xl text-white font-semibold text-lg group"
          >
            Agendar una demo
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1.5 transition-transform duration-300"
            />
          </motion.a>

          <p className="text-[12px] text-white/65 mt-7 tracking-wide">
            Sin compromiso · Respuesta en 24hs · Demo personalizada
          </p>
        </motion.div>
      </div>
    </section>
  );
}
