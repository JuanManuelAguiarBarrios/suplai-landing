"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { TrendingDown, TrendingUp, ShieldCheck, Eye } from "lucide-react";

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
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (isZero) {
      setCount(0);
      return;
    }

    let start = 0;
    const duration = 2200;
    const steps = duration / 16;
    const increment = value / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value, isZero]);

  return (
    <span className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text tabular-nums">
      {isZero ? "0" : count}
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

      {/* Dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/[0.04] to-transparent" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
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
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.15 + idx * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center mx-auto mb-6">
                <metric.icon
                  size={24}
                  strokeWidth={1.5}
                  className="text-indigo-400"
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
              <p className="text-[13px] text-gray-500 font-medium">
                {metric.prefix} {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
