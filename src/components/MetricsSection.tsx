"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TrendingDown, ShieldCheck, Eye } from "lucide-react";

const metrics = [
  {
    icon: TrendingDown,
    value: 70,
    suffix: "%",
    label: "menos llamadas manuales",
    prefix: "↓",
  },
  {
    icon: TrendingDown,
    value: 50,
    suffix: "%",
    label: "carga administrativa",
    prefix: "↓",
  },
  {
    icon: Eye,
    value: 100,
    suffix: "%",
    label: "visibilidad en tiempo real",
    prefix: "↑",
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
  const springValue = useSpring(0, { stiffness: 50, damping: 20, mass: 1 });
  const display = useTransform(springValue, (v) => Math.round(v));
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isInView || isZero) return;
    springValue.set(value);
  }, [isInView, value, isZero, springValue]);

  useEffect(() => {
    const unsubscribe = display.on("change", (v) => setCurrent(v));
    return unsubscribe;
  }, [display]);

  return (
    <span className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text tabular-nums">
      {isZero ? "0" : current}
      {suffix}
    </span>
  );
}

export default function MetricsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="metricas" className="relative py-32 px-6 lg:px-8" ref={ref}>
      <div className="section-divider mb-32" />

      {/* Accent gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(115,175,255,0.08)] to-transparent" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <div className="badge mx-auto mb-6">Resultados</div>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-[-0.02em]">
            Impacto <span className="gradient-text">medible</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{
                duration: 0.7,
                delay: 0.15 + idx * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-[rgba(45,68,204,0.05)] border border-[rgba(45,68,204,0.1)] flex items-center justify-center mx-auto mb-6 hover:bg-[rgba(45,68,204,0.1)] hover:scale-110 transition-all duration-500">
                <metric.icon
                  size={24}
                  strokeWidth={1.5}
                  className="text-[rgb(45,68,204)] opacity-70"
                />
              </div>
              <div className="mb-3">
                <AnimatedCounter
                  value={metric.value}
                  suffix={metric.suffix}
                  isZero={metric.isZero}
                  isInView={isInView}
                />
              </div>
              {/* Decorative line under number */}
              <div className="w-12 h-0.5 mx-auto mb-4 rounded-full bg-gradient-to-r from-[rgba(45,68,204,0.2)] via-[rgba(115,175,255,0.3)] to-[rgba(45,68,204,0.2)]" />
              <p className="text-[13px] text-slate-500 font-medium">
                {metric.prefix} {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
