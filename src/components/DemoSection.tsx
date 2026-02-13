"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Phone,
  PhoneOff,
  CheckCircle2,
  Truck,
  ArrowRight,
} from "lucide-react";

const demoSteps = [
  { label: "Iniciando llamada" },
  { label: "Conductor respondió" },
  { label: "IA procesando" },
  { label: "Estado actualizado" },
];

export default function DemoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [currentStep, setCurrentStep] = useState(-1);
  const [cardColumn, setCardColumn] = useState<"transit" | "delivered">("transit");
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!isInView || hasStarted) return;
    setHasStarted(true);

    const runDemo = () => {
      setCurrentStep(0);
      setCardColumn("transit");
      setTimeout(() => setCurrentStep(1), 1800);
      setTimeout(() => setCurrentStep(2), 3500);
      setTimeout(() => {
        setCurrentStep(3);
        setCardColumn("delivered");
      }, 5000);
      setTimeout(() => {
        setCurrentStep(-1);
        setCardColumn("transit");
        setHasStarted(false);
      }, 8000);
    };

    const timeout = setTimeout(runDemo, 800);
    return () => clearTimeout(timeout);
  }, [isInView, hasStarted]);

  return (
    <section id="demo" className="relative py-32 px-6 lg:px-8" ref={ref}>
      <div className="section-divider mb-32" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-20"
        >
          <div className="badge mx-auto mb-6">Demo interactiva</div>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-[-0.02em]">
            Mirá la <span className="gradient-text">IA en acción</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative"
        >
          <div className="absolute -inset-6 bg-gradient-to-r from-indigo-600/[0.08] via-violet-600/[0.06] to-indigo-600/[0.08] rounded-[40px] blur-2xl" />

          <div className="relative glass-card rounded-2xl md:rounded-3xl p-6 md:p-10">
            {/* Demo header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                <span className="text-[10px] text-gray-500 ml-3 font-mono tracking-wider">suplai.app/demo</span>
              </div>
              <button
                onClick={() => { if (currentStep === -1) setHasStarted(false); }}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 transition-colors border border-indigo-500/20 px-3 py-1 rounded-lg hover:bg-indigo-500/5"
              >
                Reiniciar
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Left: Call simulation */}
              <div>
                <p className="text-[10px] font-bold text-gray-500 mb-5 uppercase tracking-[0.15em]">Agente IA</p>

                <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 mb-5">
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-700 ${
                      currentStep >= 0 && currentStep < 3
                        ? "bg-indigo-500/20 pulse-glow"
                        : currentStep === 3 ? "bg-emerald-500/20" : "bg-white/[0.04]"
                    }`}>
                      {currentStep >= 0 && currentStep < 3 ? (
                        <Phone size={18} className="text-indigo-400" />
                      ) : currentStep === 3 ? (
                        <CheckCircle2 size={18} className="text-emerald-400" />
                      ) : (
                        <PhoneOff size={18} className="text-gray-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Carlos M.</p>
                      <p className="text-[11px] text-gray-500 font-mono">+54 11 5555-1234</p>
                    </div>
                  </div>

                  {currentStep >= 0 && currentStep < 3 && (
                    <div className="flex items-end justify-center gap-[3px] h-7 mb-4">
                      {Array.from({ length: 24 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-[3px] bg-gradient-to-t from-indigo-500/40 to-indigo-400/80 rounded-full"
                          animate={{ height: [3, Math.random() * 22 + 3, 3] }}
                          transition={{ duration: 0.4 + Math.random() * 0.6, repeat: Infinity, delay: i * 0.04 }}
                        />
                      ))}
                    </div>
                  )}

                  <div className="space-y-2.5">
                    <AnimatePresence>
                      {currentStep >= 0 && (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                          <div className="bg-indigo-500/[0.08] border border-indigo-500/10 rounded-xl rounded-tl-sm px-3.5 py-2.5 max-w-[85%]">
                            <p className="text-[11px] text-indigo-200/90 leading-relaxed">
                              &quot;Hola Carlos, te llamo de Suplai. ¿Podés confirmar el estado de tu envío BUE → CBA?&quot;
                            </p>
                          </div>
                        </motion.div>
                      )}
                      {currentStep >= 1 && (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex justify-end">
                          <div className="bg-white/[0.05] border border-white/[0.06] rounded-xl rounded-tr-sm px-3.5 py-2.5 max-w-[85%]">
                            <p className="text-[11px] text-gray-300/90 leading-relaxed">
                              &quot;Sí, ya entregué todo hace 20 minutos en el depósito.&quot;
                            </p>
                          </div>
                        </motion.div>
                      )}
                      {currentStep >= 2 && (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                          <div className="bg-indigo-500/[0.08] border border-indigo-500/10 rounded-xl rounded-tl-sm px-3.5 py-2.5 max-w-[85%]">
                            <p className="text-[11px] text-indigo-200/90 leading-relaxed">
                              &quot;Perfecto, actualizo el estado a Entregado. ¡Gracias Carlos!&quot;
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {demoSteps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${idx <= currentStep ? "bg-indigo-500" : "bg-white/[0.08]"}`} />
                      <span className={`text-[9px] font-medium transition-colors duration-500 ${idx <= currentStep ? "text-indigo-400" : "text-gray-700"}`}>{step.label}</span>
                      {idx < demoSteps.length - 1 && <ArrowRight size={8} className="text-gray-800 mx-0.5" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Kanban update */}
              <div>
                <p className="text-[10px] font-bold text-gray-500 mb-5 uppercase tracking-[0.15em]">Tablero Kanban</p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-3.5">
                    <div className="flex items-center gap-1.5 mb-3.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">En Tránsito</span>
                    </div>
                    <AnimatePresence>
                      {cardColumn === "transit" && (
                        <motion.div layout initial={{ opacity: 1 }} exit={{ opacity: 0, x: 40, scale: 0.85 }} transition={{ type: "spring", stiffness: 250, damping: 25 }}
                          className="p-3 rounded-lg bg-white/[0.03] border border-indigo-500/15">
                          <div className="flex items-center gap-1.5 mb-1">
                            <Truck size={11} className="text-indigo-400" />
                            <span className="text-[10px] font-semibold text-white/90">Carlos M.</span>
                          </div>
                          <span className="text-[9px] text-gray-500 font-mono">BUE → CBA</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {cardColumn === "delivered" && <div className="h-14 border border-dashed border-white/[0.04] rounded-lg" />}
                  </div>

                  <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-3.5">
                    <div className="flex items-center gap-1.5 mb-3.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Entregado</span>
                    </div>
                    <AnimatePresence>
                      {cardColumn === "delivered" && (
                        <motion.div layout initial={{ opacity: 0, x: -40, scale: 0.85 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ type: "spring", stiffness: 250, damping: 25 }}
                          className="p-3 rounded-lg bg-white/[0.03] border border-emerald-500/15">
                          <div className="flex items-center gap-1.5 mb-1">
                            <CheckCircle2 size={11} className="text-emerald-400" />
                            <span className="text-[10px] font-semibold text-white/90">Carlos M.</span>
                          </div>
                          <span className="text-[9px] text-gray-500 font-mono">BUE → CBA</span>
                          <div className="flex items-center gap-1 mt-2">
                            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[8px] text-emerald-400 font-medium">Sincronizado</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <AnimatePresence>
                  {currentStep === 3 && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/15">
                      <CheckCircle2 size={13} className="text-emerald-400" />
                      <span className="text-[11px] text-emerald-400 font-medium">Estado actualizado automáticamente</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
