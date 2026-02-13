"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Truck, Package, Ship, Anchor, Car } from "lucide-react";

const audiences = [
  { icon: Truck, label: "Empresas de logística", desc: "Last-mile, larga distancia, 3PL" },
  { icon: Package, label: "Distribuidoras", desc: "Productos de consumo masivo" },
  { icon: Ship, label: "Importadoras", desc: "Comercio exterior y aduanas" },
  { icon: Anchor, label: "Empresas portuarias", desc: "Operaciones en terminal" },
  { icon: Car, label: "Flota propia", desc: "Gestión de vehículos internos" },
];

export default function AudienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-32 px-6 lg:px-8" ref={ref}>
      <div className="section-divider mb-32" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-20"
        >
          <div className="badge mx-auto mb-6">Para quién</div>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-[-0.02em] max-w-2xl mx-auto">
            Diseñado para empresas con{" "}
            <span className="gradient-text">alta carga operativa</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {audiences.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + idx * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="gradient-border p-6 flex flex-col items-center text-center cursor-default group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] flex items-center justify-center mb-4 group-hover:bg-indigo-500/10 transition-all duration-500">
                <item.icon size={28} strokeWidth={1.5} className="text-gray-500 group-hover:text-indigo-400 transition-colors duration-500" />
              </div>
              <span className="text-[13px] font-semibold text-gray-300 group-hover:text-white transition-colors duration-500 mb-1">
                {item.label}
              </span>
              <span className="text-[11px] text-gray-600">{item.desc}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
