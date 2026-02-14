"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Truck, Package, Ship, Anchor, Car, Warehouse } from "lucide-react";

const audiences = [
  {
    icon: Truck,
    label: "Empresas de logística",
    desc: "Last-mile, larga distancia y operadores 3PL que necesitan visibilidad total de sus envíos.",
    hoverBg: "rgba(45,68,204,0.08)",
    iconBg: "rgba(45,68,204,0.12)",
  },
  {
    icon: Package,
    label: "Distribuidoras",
    desc: "Productos de consumo masivo con alta frecuencia de entregas y necesidad de confirmación rápida.",
    hoverBg: "rgba(70,118,228,0.08)",
    iconBg: "rgba(70,118,228,0.12)",
  },
  {
    icon: Ship,
    label: "Importadoras",
    desc: "Comercio exterior y operaciones aduaneras con múltiples puntos de contacto y seguimiento.",
    hoverBg: "rgba(115,175,255,0.08)",
    iconBg: "rgba(115,175,255,0.12)",
  },
  {
    icon: Anchor,
    label: "Empresas portuarias",
    desc: "Operaciones en terminal que requieren coordinación precisa de vehículos y cargas.",
    hoverBg: "rgba(45,68,204,0.07)",
    iconBg: "rgba(45,68,204,0.12)",
  },
  {
    icon: Car,
    label: "Flota propia",
    desc: "Gestión de vehículos internos con seguimiento automático de estado y reportes.",
    hoverBg: "rgba(70,118,228,0.07)",
    iconBg: "rgba(70,118,228,0.12)",
  },
  {
    icon: Warehouse,
    label: "Centros de distribución",
    desc: "Coordinación de entradas y salidas de mercadería con actualización en tiempo real.",
    hoverBg: "rgba(115,175,255,0.07)",
    iconBg: "rgba(115,175,255,0.12)",
  },
];

export default function AudienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="relative py-32 px-6 lg:px-8" ref={ref}>
      <div className="section-divider mb-32" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <div className="badge mx-auto mb-6">Para quién</div>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-[-0.02em] max-w-3xl mx-auto">
            Diseñado para empresas con{" "}
            <span className="gradient-text">alta carga operativa</span>
          </h2>
          <p className="text-slate-500 text-base mt-5 max-w-xl mx-auto leading-relaxed">
            Automatizá la comunicación con conductores sin importar tu
            industria. Suplai se adapta a tu operación.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {audiences.map((item, idx) => {
            const isHovered = hoveredIdx === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + idx * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="relative rounded-2xl border p-7 cursor-default overflow-hidden transition-all duration-500 min-h-[220px] flex flex-col justify-between group"
                style={{
                  background: isHovered
                    ? `linear-gradient(135deg, ${item.hoverBg}, rgba(255,255,255,0.98))`
                    : "rgba(255,255,255,0.92)",
                  borderColor: isHovered
                    ? "rgba(45,68,204,0.2)"
                    : "rgba(45,68,204,0.1)",
                  transform: isHovered ? "translateY(-6px)" : "translateY(0)",
                  boxShadow: isHovered
                    ? "0 20px 40px rgba(45,68,204,0.1), 0 8px 16px rgba(45,68,204,0.06)"
                    : "0 2px 8px rgba(45,68,204,0.04)",
                }}
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-500"
                  style={{
                    background: isHovered
                      ? item.iconBg
                      : "rgba(45,68,204,0.04)",
                    transform: isHovered ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  <item.icon
                    size={26}
                    strokeWidth={1.5}
                    className={`transition-colors duration-500 ${
                      isHovered ? "text-[rgb(45,68,204)]" : "text-slate-400"
                    }`}
                  />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-2 font-sans">
                    {item.label}
                  </h3>
                  <p
                    className="text-[13px] leading-relaxed transition-colors duration-500"
                    style={{
                      color: isHovered
                        ? "rgba(15,23,42,0.7)"
                        : "rgba(100,116,139,1)",
                    }}
                  >
                    {item.desc}
                  </p>
                </div>

                {/* Decorative gradient blob on hover */}
                <div
                  className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-[60px] transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${item.hoverBg}, transparent)`,
                    opacity: isHovered ? 0.8 : 0,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
