"use client";

import { m as motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Eye, ShieldCheck, TrendingDown } from "lucide-react";

const metrics = [
  {
    icon: TrendingDown,
    value: 70,
    suffix: "%",
    label: "menos llamadas manuales",
    prefix: "-",
  },
  {
    icon: TrendingDown,
    value: 50,
    suffix: "%",
    label: "carga administrativa",
    prefix: "-",
  },
  {
    icon: Eye,
    value: 100,
    suffix: "%",
    label: "visibilidad en tiempo real",
    prefix: "+",
  },
  {
    icon: ShieldCheck,
    value: 0,
    suffix: "",
    label: "errores por carga manual",
    prefix: "",
    isZero: true,
  },
];

function AnimatedCounter({
  value,
  suffix,
  isZero,
  isInView,
}: {
  value: number;
  suffix: string;
  isZero?: boolean;
  isInView: boolean;
}) {
  const springValue = useSpring(0, { stiffness: 55, damping: 20, mass: 1 });
  const display = useTransform(springValue, (v) => Math.round(v));
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isInView || isZero) return;
    springValue.set(value);
  }, [isInView, isZero, springValue, value]);

  useEffect(() => {
    const unsubscribe = display.on("change", (v) => setCurrent(v));
    return unsubscribe;
  }, [display]);

  return (
    <span className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white tabular-nums leading-none">
      {isZero ? "0" : current}
      {suffix}
    </span>
  );
}

export default function MetricsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="metricas"
      className="deferred-section relative py-28 md:py-32 px-6 lg:px-8 bg-[linear-gradient(180deg,#07132e_0%,#081a3c_52%,#061127_100%)] overflow-hidden"
      ref={ref}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-44 left-1/4 w-[520px] h-[520px] rounded-full bg-[rgba(45,68,204,0.38)] blur-[130px]" />
        <div className="absolute -bottom-48 right-0 w-[560px] h-[560px] rounded-full bg-[rgba(115,175,255,0.25)] blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[10px] tracking-[0.16em] uppercase font-semibold text-white/80 mb-6">
            Resultados
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[2.8rem] tracking-[-0.02em] text-white mb-4">
            Impacto medible en la operacion
          </h2>
          <p className="text-white/72 text-[15px] max-w-2xl mx-auto leading-relaxed">
            La automatizacion reduce friccion operativa y mejora la velocidad de respuesta en cada tramo logístico.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {metrics.map((metric, idx) => (
            <motion.article
              key={metric.label}
              initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{
                duration: 0.66,
                delay: 0.1 + idx * 0.09,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative overflow-hidden rounded-2xl border border-white/18 bg-white/8 backdrop-blur-xl p-5 md:p-6"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-[linear-gradient(90deg,rgba(115,175,255,0.2),rgba(115,175,255,0.95),rgba(115,175,255,0.2))]" />
              <div className="w-11 h-11 rounded-xl border border-white/24 bg-white/10 flex items-center justify-center mb-6">
                <metric.icon size={20} className="text-[rgb(161,203,255)]" />
              </div>

              <div className="mb-4 flex items-end gap-1">
                <span className="text-[rgb(161,203,255)] text-lg font-semibold leading-none">
                  {metric.prefix}
                </span>
                <AnimatedCounter
                  value={metric.value}
                  suffix={metric.suffix}
                  isZero={metric.isZero}
                  isInView={isInView}
                />
              </div>

              <p className="text-[13px] text-white/78 leading-relaxed">{metric.label}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
