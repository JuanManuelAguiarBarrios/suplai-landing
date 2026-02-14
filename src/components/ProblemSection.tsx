"use client";

import { m as motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AlertTriangle, ClipboardList, MessageSquare, Phone } from "lucide-react";

const problems = [
  {
    icon: Phone,
    title: "Llamadas manuales a conductores",
    description:
      "Horas perdidas llamando uno por uno para obtener actualizaciones de estado.",
  },
  {
    icon: MessageSquare,
    title: "Mensajes de WhatsApp desordenados",
    description:
      "Informacion dispersa en chats sin estructura ni trazabilidad.",
  },
  {
    icon: ClipboardList,
    title: "Sobrecarga administrativa",
    description:
      "Tu equipo dedica mas tiempo a coordinar que a gestionar la operacion.",
  },
  {
    icon: AlertTriangle,
    title: "Errores humanos en estados",
    description:
      "Actualizaciones manuales que generan datos incorrectos y decisiones erradas.",
  },
];

export default function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="problema"
      className="deferred-section relative py-28 md:py-32 px-6 lg:px-8 bg-[linear-gradient(180deg,#ffffff_0%,#f7f9ff_72%,#ffffff_100%)]"
      ref={ref}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(45,68,204,0.03)_1px,transparent_1px),linear-gradient(rgba(45,68,204,0.03)_1px,transparent_1px)] bg-[size:42px_42px] opacity-55" />
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[0.92fr_1.08fr] gap-12 lg:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="industrial-kicker mb-6">Diagnóstico operativo</div>
            <h2 className="text-3xl md:text-4xl lg:text-[2.8rem] leading-[1.08] tracking-[-0.02em] text-slate-950 mb-6">
              Los seguimientos manuales estan <span className="gradient-text">frenando tu operacion</span>
            </h2>
            <p className="text-slate-600 text-[15px] leading-relaxed max-w-md">
              Cuando el seguimiento depende de tareas manuales, la informacion llega tarde, el equipo se satura y las decisiones se vuelven reactivas.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-5 relative">
            {problems.map((problem, idx) => (
              <motion.article
                key={problem.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.68,
                  delay: 0.12 + idx * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative rounded-2xl border border-[rgba(45,68,204,0.18)] bg-white/95 p-6 shadow-[0_14px_26px_rgba(45,68,204,0.07)] overflow-hidden"
              >
                <div className="absolute top-0 left-0 h-full w-1 bg-[linear-gradient(180deg,rgb(45,68,204),rgb(115,175,255))]" />
                <div className="absolute top-0 right-0 h-8 w-8 bg-[rgba(45,68,204,0.06)] border-l border-b border-[rgba(45,68,204,0.12)] rounded-bl-xl" />
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl border border-[rgba(45,68,204,0.14)] bg-[rgba(45,68,204,0.06)] flex items-center justify-center">
                    <problem.icon size={20} strokeWidth={1.6} className="text-[rgb(45,68,204)]" />
                  </div>
                  <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-slate-400">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-[16px] font-semibold text-slate-900 mb-2.5 leading-snug">
                  {problem.title}
                </h3>
                <p className="text-[13px] text-slate-600 leading-relaxed">
                  {problem.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
