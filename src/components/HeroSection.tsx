"use client";

import { motion } from "framer-motion";
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

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden grain-overlay">
      {/* Animated gradient orbs - more expressive */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -60, 30, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 left-1/4 w-[800px] h-[800px] bg-[rgba(45,68,204,0.08)] rounded-full blur-[160px]"
        />
        <motion.div
          animate={{
            x: [0, -60, 40, 0],
            y: [0, 40, -40, 0],
            scale: [1, 0.85, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-48 right-1/4 w-[700px] h-[700px] bg-[rgba(115,175,255,0.1)] rounded-full blur-[140px]"
        />
        <motion.div
          animate={{
            x: [0, 30, -40, 0],
            y: [0, -30, 50, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[rgba(90,120,240,0.07)] rounded-full blur-[120px]"
        />
        {/* Extra decorative orb */}
        <motion.div
          animate={{
            x: [0, -20, 30, 0],
            y: [0, 40, -20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-1/3 w-[300px] h-[300px] bg-[rgba(45,68,204,0.05)] rounded-full blur-[100px]"
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
            className="text-lg md:text-xl text-slate-500 leading-relaxed mb-10 font-light"
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
          animate={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ perspective: 1000 }}
          className="animate-float"
        >
          <KanbanMockup />
        </motion.div>
      </div>
    </section>
  );
}
