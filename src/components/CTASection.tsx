"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="cta" className="relative py-40 px-6 lg:px-8" ref={ref}>
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600 rounded-full blur-[200px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.06, 0.1, 0.06],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600 rounded-full blur-[160px]"
        />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-[3rem] font-bold leading-[1.1] tracking-[-0.02em] mb-7">
            Dejá que la IA haga el{" "}
            <span className="gradient-text">seguimiento por vos</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-xl mx-auto font-light leading-relaxed">
            Sumate a las empresas que ya automatizan sus operaciones logísticas
            con Suplai.
          </p>

          <motion.a
            href="mailto:contacto@suplai.com"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2.5 glow-button px-10 py-4 rounded-2xl text-white font-semibold text-lg group"
          >
            Agendar una demo
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </motion.a>

          <p className="text-[12px] text-gray-600 mt-8 tracking-wide">
            Sin compromiso · Respuesta en 24hs · Demo personalizada
          </p>
        </motion.div>
      </div>
    </section>
  );
}
