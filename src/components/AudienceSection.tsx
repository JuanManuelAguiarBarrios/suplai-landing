"use client";

import { m as motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Anchor, Car, Package, Ship, Truck, Warehouse } from "lucide-react";

const audiences = [
  {
    icon: Truck,
    label: "Empresas de logistica",
    desc: "Last-mile, larga distancia y operadores 3PL que necesitan visibilidad total de sus envios.",
  },
  {
    icon: Package,
    label: "Distribuidoras",
    desc: "Productos de consumo masivo con alta frecuencia de entregas y necesidad de confirmacion rapida.",
  },
  {
    icon: Ship,
    label: "Importadoras",
    desc: "Comercio exterior y operaciones aduaneras con multiples puntos de contacto y seguimiento.",
  },
  {
    icon: Anchor,
    label: "Empresas portuarias",
    desc: "Operaciones en terminal que requieren coordinacion precisa de vehiculos y cargas.",
  },
  {
    icon: Car,
    label: "Flota propia",
    desc: "Gestion de vehiculos internos con seguimiento automatico de estado y reportes.",
  },
  {
    icon: Warehouse,
    label: "Centros de distribucion",
    desc: "Coordinacion de entradas y salidas de mercaderia con actualizacion en tiempo real.",
  },
];

export default function AudienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="deferred-section relative py-28 md:py-32 px-6 lg:px-8 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-11 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="badge mb-6">Para quien</div>
            <h2 className="text-3xl md:text-4xl lg:text-[2.8rem] leading-[1.08] tracking-[-0.02em] text-slate-950 mb-5">
              Diseñado para empresas con <span className="gradient-text">alta carga operativa</span>
            </h2>
            <p className="text-slate-600 text-[15px] leading-relaxed max-w-md">
              Automatiza la comunicacion con conductores sin importar tu rubro. Suplai se adapta al pulso real de tu operacion.
            </p>

          </motion.div>

          <div className="space-y-3">
            {audiences.map((item, idx) => (
              <motion.article
                key={item.label}
                initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{
                  duration: 0.62,
                  delay: 0.08 + idx * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group rounded-2xl border border-[rgba(45,68,204,0.14)] bg-white px-5 py-4 md:px-6 md:py-[18px] shadow-[0_8px_20px_rgba(45,68,204,0.06)] hover:shadow-[0_18px_32px_rgba(45,68,204,0.12)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="grid grid-cols-[auto_1fr] gap-3.5 items-start">
                  <div className="w-10 h-10 rounded-xl border border-[rgba(45,68,204,0.16)] bg-[rgba(45,68,204,0.07)] flex items-center justify-center group-hover:bg-[rgba(45,68,204,0.12)] transition-colors duration-300">
                    <item.icon size={18} className="text-[rgb(45,68,204)]" />
                  </div>

                  <div>
                    <h3 className="text-[15px] font-semibold text-slate-900 mb-1.5">{item.label}</h3>
                    <p className="text-[13px] text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
