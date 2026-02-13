"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Phone, Mic, Brain, LayoutDashboard } from "lucide-react";

const steps = [
  {
    icon: Phone,
    title: "El agente IA llama al conductor",
    description: "Llamada automática programada o por trigger de tu sistema.",
  },
  {
    icon: Mic,
    title: "El conductor responde",
    description: "Conversación natural por voz, sin apps ni formularios.",
  },
  {
    icon: Brain,
    title: "La IA interpreta la información",
    description: "Procesamiento de lenguaje natural para extraer datos clave.",
  },
  {
    icon: LayoutDashboard,
    title: "El tablero se actualiza",
    description: "Estado, ubicación y ETA actualizados en tiempo real.",
  },
];

export default function SolutionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section id="solucion" className="relative py-32 px-6 lg:px-8" ref={ref}>
      <div className="section-divider mb-32" />

      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-indigo-600/[0.04] rounded-full blur-[140px]" />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-20"
        >
          <div className="badge mx-auto mb-6">La solución</div>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-[-0.02em]">
            Un flujo{" "}
            <span className="gradient-text">100% automatizado</span>
          </h2>
        </motion.div>

        {/* Flow steps */}
        <div className="relative">
          {/* Connecting line - desktop */}
          <div className="absolute top-[52px] left-[12.5%] right-[12.5%] h-px bg-white/[0.04] hidden lg:block" />
          <motion.div
            className="absolute top-[52px] left-[12.5%] h-px bg-gradient-to-r from-indigo-500 to-violet-500 hidden lg:block origin-left"
            initial={{ scaleX: 0 }}
            animate={
              isInView
                ? { scaleX: (activeStep + 1) / steps.length }
                : { scaleX: 0 }
            }
            style={{ width: "75%" }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          />

          <div className="grid lg:grid-cols-4 gap-10 lg:gap-6">
            {steps.map((step, idx) => {
              const isActive = idx <= activeStep;
              const isCurrent = idx === activeStep;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.15 + idx * 0.12,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Step circle */}
                  <motion.div
                    animate={
                      isCurrent
                        ? { scale: [1, 1.08, 1] }
                        : { scale: 1 }
                    }
                    transition={{ duration: 1.5, repeat: isCurrent ? Infinity : 0 }}
                    className={`relative w-[104px] h-[104px] rounded-3xl flex items-center justify-center mb-7 transition-all duration-700 ${
                      isActive
                        ? "bg-gradient-to-br from-indigo-500/20 to-violet-600/20 border border-indigo-500/30"
                        : "bg-white/[0.02] border border-white/[0.06]"
                    }`}
                  >
                    {isCurrent && (
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 animate-pulse" />
                    )}
                    <step.icon
                      size={32}
                      strokeWidth={1.5}
                      className={`relative z-10 transition-colors duration-500 ${
                        isActive ? "text-indigo-400" : "text-gray-600"
                      }`}
                    />
                  </motion.div>

                  {/* Step number */}
                  <span
                    className={`text-[10px] font-bold uppercase tracking-[0.15em] mb-2 transition-colors duration-500 ${
                      isActive ? "text-indigo-400" : "text-gray-700"
                    }`}
                  >
                    Paso {idx + 1}
                  </span>

                  <h3
                    className={`text-[15px] font-semibold mb-2 transition-colors duration-500 ${
                      isActive ? "text-white" : "text-gray-600"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[13px] text-gray-500 leading-relaxed max-w-[200px]">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
