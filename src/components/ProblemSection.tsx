"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, MessageSquare, ClipboardList, AlertTriangle } from "lucide-react";

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
      "Información dispersa en chats sin estructura ni trazabilidad.",
  },
  {
    icon: ClipboardList,
    title: "Sobrecarga administrativa",
    description:
      "Tu equipo dedica más tiempo a coordinar que a gestionar la operación.",
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
    <section id="problema" className="relative py-32 px-6 lg:px-8" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-20"
        >
          <div className="badge mx-auto mb-6">El problema</div>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.15] tracking-[-0.02em] max-w-2xl mx-auto">
            Los seguimientos manuales están{" "}
            <span className="gradient-text">frenando tu operación</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {problems.map((problem, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.15 + idx * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="gradient-border p-7 group cursor-default"
            >
              <div className="w-11 h-11 rounded-xl bg-[rgba(45,68,204,0.1)] flex items-center justify-center mb-5 group-hover:bg-[rgba(45,68,204,0.12)] transition-all duration-400">
                <problem.icon
                  size={22}
                  strokeWidth={1.5}
                  className="text-slate-500 group-hover:text-[rgb(45,68,204)] transition-colors duration-400"
                />
              </div>
              <h3 className="text-[15px] font-semibold text-slate-900 mb-2.5 leading-snug">
                {problem.title}
              </h3>
              <p className="text-[13px] text-slate-500 leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
