"use client";

import { motion, useInView } from "framer-motion";
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

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
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
              initial={{ opacity: 0, y: 35 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.1 + idx * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="gradient-border p-8 group cursor-default"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/[0.08] to-violet-500/[0.08] flex items-center justify-center mb-6 group-hover:from-indigo-500/[0.15] group-hover:to-violet-500/[0.15] transition-all duration-500">
                <feature.icon
                  size={24}
                  strokeWidth={1.5}
                  className="text-indigo-400 group-hover:text-indigo-300 transition-colors duration-500"
                />
              </div>
              <h3 className="text-[16px] font-semibold text-white mb-3 leading-snug">
                {feature.title}
              </h3>
              <p className="text-[13px] text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
