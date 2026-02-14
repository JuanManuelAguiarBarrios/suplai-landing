"use client";

import { m as motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Mic2,
  MessageCircle,
  LayoutDashboard,
  RefreshCw,
  FileBarChart,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: Mic2,
    title: "Agente de voz con IA",
    description:
      "Llamadas automáticas inteligentes que mantienen conversaciones naturales con conductores.",
  },
  {
    icon: MessageCircle,
    title: "Integración con WhatsApp",
    description:
      "Comunicación omnicanal que se adapta a las preferencias de cada conductor.",
  },
  {
    icon: LayoutDashboard,
    title: "Tablero Kanban en tiempo real",
    description:
      "Visibilidad completa de todas tus operaciones en un solo lugar.",
  },
  {
    icon: RefreshCw,
    title: "Actualización automática de estados",
    description:
      "Sin intervención manual. La IA actualiza el estado de cada envío.",
  },
  {
    icon: FileBarChart,
    title: "Reportes mensuales automáticos",
    description:
      "Informes detallados generados automáticamente para tu equipo.",
  },
  {
    icon: BarChart3,
    title: "Dashboard de estadísticas",
    description:
      "Métricas operativas en tiempo real para tomar mejores decisiones.",
  },
];

export default function ProductSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="producto" className="relative py-32 px-6 lg:px-8" ref={ref}>
      <div className="section-divider mb-32" />

      {/* Subtle animated background */}
      <div className="absolute inset-0 animated-gradient-bg" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <div className="badge mx-auto mb-6">Producto</div>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-[-0.02em] max-w-2xl mx-auto">
            Todo lo que necesitás en{" "}
            <span className="gradient-text">una sola plataforma</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{
                duration: 0.7,
                delay: 0.1 + idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="gradient-border p-8 group cursor-default"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[rgba(45,68,204,0.06)] to-[rgba(115,175,255,0.06)] border border-[rgba(45,68,204,0.1)] flex items-center justify-center mb-6 group-hover:from-[rgba(45,68,204,0.15)] group-hover:to-[rgba(115,175,255,0.15)] group-hover:border-[rgba(45,68,204,0.25)] group-hover:scale-110 transition-all duration-500">
                <feature.icon
                  size={24}
                  strokeWidth={1.5}
                  className="text-[rgb(45,68,204)] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
              <h3 className="text-[16px] font-semibold text-slate-900 mb-3 leading-snug">
                {feature.title}
              </h3>
              <p className="text-[13px] text-slate-500 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
