"use client";

import { motion } from "framer-motion";
import KanbanMockup from "./KanbanMockup";

const wordVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.3 + i * 0.06,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

export default function HeroSection() {
  const titleWords = "Automatizá tus operaciones logísticas con".split(" ");

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 left-1/4 w-[700px] h-[700px] bg-indigo-600/[0.12] rounded-full blur-[140px]"
        />
        <motion.div
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 30, -30, 0],
            scale: [1, 0.9, 1.15, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 right-1/4 w-[600px] h-[600px] bg-violet-600/[0.08] rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, 20, -30, 0],
            y: [0, -20, 40, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-blue-600/[0.06] rounded-full blur-[100px]"
        />
      </div>

      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Radial fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#030712] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 grid lg:grid-cols-2 gap-16 lg:gap-20 items-center w-full">
        {/* Left content */}
        <div className="max-w-xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="badge mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
              </span>
              Potenciado por Inteligencia Artificial
            </div>
          </motion.div>

          {/* Title with word-by-word animation */}
          <h1 className="text-[2.5rem] md:text-[3.25rem] lg:text-[3.75rem] font-bold leading-[1.1] tracking-[-0.02em] mb-7">
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
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: 0.3 + titleWords.length * 0.06,
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="gradient-text"
            >
              agentes de voz con IA
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="text-lg md:text-xl text-gray-400 leading-relaxed mb-10 font-light"
          >
            Suplai llama automáticamente a los conductores, interpreta sus
            respuestas y actualiza tu sistema en tiempo real.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#cta"
              className="glow-button px-8 py-3.5 rounded-xl text-white font-semibold text-[15px]"
            >
              Solicitar demo
            </a>
            <a
              href="#solucion"
              className="outline-button px-8 py-3.5 rounded-xl text-white font-medium text-[15px]"
            >
              Ver cómo funciona
            </a>
          </motion.div>

          {/* Social proof mini */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="mt-12 flex items-center gap-4"
          >
            <div className="flex -space-x-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500/30 to-violet-500/30 border-2 border-[#030712] flex items-center justify-center"
                >
                  <span className="text-[9px] font-medium text-indigo-300">
                    {["JM", "LG", "DR", "AP"][i]}
                  </span>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs text-gray-500">
                Empresas de logística ya confían en Suplai
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right - Kanban mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1,
            delay: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="animate-float"
        >
          <KanbanMockup />
        </motion.div>
      </div>
    </section>
  );
}
