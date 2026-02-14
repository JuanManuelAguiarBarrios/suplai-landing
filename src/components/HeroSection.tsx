"use client";

import { m as motion, useReducedMotion } from "framer-motion";
import KanbanMockup from "./KanbanMockup";

const wordVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.4 + i * 0.08,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function HeroSection() {
  const titleWords = "Automatizá tus operaciones logísticas con".split(" ");
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated gradient orbs - more expressive */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, 28, -18, 0],
                  y: [0, -24, 14, 0],
                  scale: [1, 1.08, 0.96, 1],
                }
          }
          transition={shouldReduceMotion ? undefined : { duration: 26, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 left-1/4 w-[560px] h-[560px] bg-[rgba(45,68,204,0.08)] rounded-full blur-[88px]"
        />
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, -30, 20, 0],
                  y: [0, 16, -18, 0],
                  scale: [1, 0.92, 1.06, 1],
                }
          }
          transition={shouldReduceMotion ? undefined : { duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 right-1/4 w-[520px] h-[520px] bg-[rgba(115,175,255,0.1)] rounded-full blur-[84px]"
        />
      </div>

      {/* Grid background with radial fade */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Radial fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 grid lg:grid-cols-2 gap-16 lg:gap-20 items-center w-full">
        {/* Left content */}
        <div className="max-w-xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="badge mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[rgb(115,175,255)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[rgb(45,68,204)]" />
              </span>
              Potenciado por Inteligencia Artificial
            </div>
          </motion.div>

          {/* Title with word-by-word animation + blur */}
          <h1 className="text-[2.5rem] md:text-[3.25rem] lg:text-[3.75rem] font-bold leading-[1.08] tracking-[-0.025em] mb-7">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={wordVariants}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
            <br />
            <motion.span
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: 0.4 + titleWords.length * 0.08,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="gradient-text"
            >
              agentes de voz con IA
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-slate-500 leading-relaxed mb-10 font-normal"
          >
            Suplai llama automáticamente a los conductores, interpreta sus
            respuestas y actualiza tu sistema en tiempo real.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-4"
          >
            <motion.a
              href="#cta"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="glow-button px-8 py-3.5 rounded-xl text-white font-semibold text-[15px]"
            >
              Solicitar demo
            </motion.a>
            <motion.a
              href="#solucion"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="outline-button px-8 py-3.5 rounded-xl text-[rgb(45,68,204)] font-medium text-[15px]"
            >
              Ver cómo funciona
            </motion.a>
          </motion.div>

          {/* Social proof - staggered avatars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-12 flex items-center gap-4"
          >
            <div className="flex -space-x-2">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0, x: -10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{
                    delay: 1.6 + i * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-[rgba(45,68,204,0.25)] to-[rgba(115,175,255,0.25)] border-2 border-white flex items-center justify-center shadow-sm"
                >
                  <span className="text-[9px] font-medium text-[rgb(70,118,228)]">
                    {["JM", "LG", "DR", "AP"][i]}
                  </span>
                </motion.div>
              ))}
            </div>
            <div>
              <p className="text-xs text-slate-400">
                Empresas de logística ya confían en Suplai
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right - Kanban mockup with 3D perspective entrance */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.92, rotateY: -8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1.2,
            delay: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ perspective: 1000 }}
          className={shouldReduceMotion ? "" : "animate-float"}
        >
          <KanbanMockup />
        </motion.div>
      </div>
    </section>
  );
}
