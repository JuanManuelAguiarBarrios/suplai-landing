"use client";

import { m as motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Brain, LayoutDashboard, Mic, Phone } from "lucide-react";

const steps = [
  {
    icon: Phone,
    title: "El agente IA llama al conductor",
    description: "Llamada automatica programada o por trigger de tu sistema.",
  },
  {
    icon: Mic,
    title: "El conductor responde",
    description: "Conversacion natural por voz, sin apps ni formularios.",
  },
  {
    icon: Brain,
    title: "La IA interpreta la informacion",
    description: "Procesamiento de lenguaje natural para extraer datos clave.",
  },
  {
    icon: LayoutDashboard,
    title: "El tablero se actualiza",
    description: "Estado, ubicacion y ETA actualizados en tiempo real.",
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
    <section id="solucion" className="relative py-28 md:py-32 px-6 lg:px-8 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="badge mx-auto mb-6">La solucion</div>
          <h2 className="text-3xl md:text-4xl lg:text-[2.8rem] tracking-[-0.02em] text-slate-950 mb-4">
            Un flujo <span className="gradient-text">100% automatizado</span>
          </h2>
          <p className="text-slate-600 text-[15px] max-w-2xl mx-auto leading-relaxed">
            Del contacto inicial a la actualizacion del tablero, todo el circuito se ejecuta sin friccion para el equipo operativo.
          </p>
        </motion.div>

        <div className="relative rounded-[30px] border border-[rgba(45,68,204,0.14)] bg-[linear-gradient(180deg,#f7f9ff_0%,#f2f5ff_100%)] p-6 md:p-8 lg:p-10 shadow-[0_24px_50px_rgba(45,68,204,0.12)] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(45,68,204,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(45,68,204,0.05)_1px,transparent_1px)] bg-[size:44px_44px] opacity-55" />

          <div className="relative">
            <div className="hidden lg:block absolute left-[10%] right-[10%] top-[78px] h-px bg-[rgba(45,68,204,0.18)]" />
            <motion.div
              className="hidden lg:block absolute left-[10%] top-[78px] h-[3px] rounded-full bg-[linear-gradient(90deg,rgb(45,68,204),rgb(115,175,255))]"
              initial={{ width: "0%" }}
              animate={isInView ? { width: `${(activeStep + 1) * 20}%` } : { width: "0%" }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            />

            <div className="grid lg:grid-cols-4 gap-5 md:gap-6">
              {steps.map((step, idx) => {
                const completed = idx <= activeStep;
                const current = idx === activeStep;

                return (
                  <motion.article
                    key={step.title}
                    initial={{ opacity: 0, y: 26, filter: "blur(6px)" }}
                    animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{
                      duration: 0.68,
                      delay: 0.12 + idx * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`relative rounded-2xl border p-5 md:p-6 transition-all duration-500 ${
                      completed
                        ? "border-[rgba(45,68,204,0.28)] bg-white shadow-[0_18px_34px_rgba(45,68,204,0.11)]"
                        : "border-[rgba(45,68,204,0.14)] bg-white/75"
                    }`}
                  >
                    {current && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute -inset-px rounded-2xl border border-[rgba(115,175,255,0.55)] pointer-events-none"
                      />
                    )}

                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-500 ${
                          completed
                            ? "bg-[rgba(45,68,204,0.1)] border-[rgba(45,68,204,0.25)]"
                            : "bg-white border-[rgba(45,68,204,0.14)]"
                        }`}
                      >
                        <step.icon
                          size={22}
                          strokeWidth={1.7}
                          className={
                            completed
                              ? "text-[rgb(45,68,204)]"
                              : "text-slate-400"
                          }
                        />
                      </div>

                      <span
                        className={`text-[10px] font-semibold tracking-[0.14em] uppercase ${
                          completed ? "text-[rgb(45,68,204)]" : "text-slate-400"
                        }`}
                      >
                        Paso {idx + 1}
                      </span>
                    </div>

                    <h3 className="text-[15px] font-semibold text-slate-900 mb-2.5 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-[13px] text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
