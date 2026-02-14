"use client";

import { useCallback, useMemo, useState } from "react";
import { m as motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  PhoneCall,
  MessageSquareText,
  LayoutDashboard,
  RefreshCw,
  FileBarChart,
} from "lucide-react";

const capabilities = [
  {
    icon: PhoneCall,
    title: "Agente de voz con IA",
    description:
      "Llamadas automáticas inteligentes con lenguaje natural para confirmar estado, ETA y desvíos en minutos.",
    detail: "Operación 24/7 sin carga manual",
  },
  {
    icon: MessageSquareText,
    title: "Integración con WhatsApp",
    description:
      "Contacto omnicanal con conductores para sostener el seguimiento incluso cuando no responden una llamada.",
    detail: "Continuidad operativa en todos los canales",
  },
  {
    icon: LayoutDashboard,
    title: "Tablero en tiempo real",
    description:
      "Vista centralizada de envíos por etapa para detectar cuellos de botella y priorizar decisiones críticas.",
    detail: "Visibilidad end-to-end de la flota",
  },
  {
    icon: RefreshCw,
    title: "Estados automáticos",
    description:
      "La IA interpreta respuestas y sincroniza actualizaciones en tu sistema sin intervención del equipo operativo.",
    detail: "Menos fricción administrativa",
  },
  {
    icon: FileBarChart,
    title: "Reportes y métricas",
    description:
      "Reportes periódicos con trazabilidad por ruta, conductor y cumplimiento para mejorar planificación.",
    detail: "Control y mejora continua de performance",
  },
];

function relativePosition(index: number, activeIndex: number, total: number) {
  let diff = index - activeIndex;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

export default function CapabilitiesCarouselSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = capabilities.length;

  const prev = useCallback(
    () => setActiveIndex((prevIndex) => (prevIndex - 1 + total) % total),
    [total]
  );

  const next = useCallback(
    () => setActiveIndex((prevIndex) => (prevIndex + 1) % total),
    [total]
  );

  const cards = useMemo(() => capabilities, []);

  return (
    <section
      id="producto"
      className="deferred-section relative py-28 md:py-32 overflow-hidden bg-[linear-gradient(180deg,#060d22_0%,#071633_52%,#061127_100%)]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-20 w-[520px] h-[520px] rounded-full bg-[rgba(45,68,204,0.32)] blur-[120px]" />
        <div className="absolute -bottom-44 right-0 w-[580px] h-[580px] rounded-full bg-[rgba(115,175,255,0.25)] blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:42px_42px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_58%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          <div className="w-full lg:w-[42%]">
            <p className="inline-flex items-center rounded-full border border-white/20 bg-white/8 px-4 py-1.5 text-[11px] tracking-[0.16em] uppercase font-semibold text-white/80 mb-6">
              Capacidades operativas
            </p>
            <h2 className="text-white text-3xl md:text-4xl lg:text-[2.8rem] leading-[1.08] tracking-[-0.02em] mb-5">
              Tecnología diseñada para operación logística real
            </h2>
            <p className="text-white/70 text-[15px] leading-relaxed mb-8">
              Mantenemos la lógica de tu operación, pero con una experiencia más
              robusta: menos tareas manuales, mejor trazabilidad y decisiones
              más rápidas en campo.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-white/80">
                Omnicanal
              </span>
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-white/80">
                Trazabilidad
              </span>
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-white/80">
                Integración API
              </span>
            </div>

          </div>

          <div className="w-full lg:w-[58%]">
            <div
              role="region"
              aria-roledescription="carousel"
              aria-label="Carrusel de capacidades logísticas"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  prev();
                }
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  next();
                }
              }}
              className="outline-none"
            >

              <div className="relative h-[360px] sm:h-[390px] md:h-[420px]">
                {cards.map((card, index) => {
                  const rel = relativePosition(index, activeIndex, total);
                  const abs = Math.abs(rel);

                  return (
                    <motion.article
                      key={card.title}
                      role="group"
                      aria-label={`${index + 1} de ${total}: ${card.title}`}
                      animate={{
                        x: rel * 250,
                        scale: rel === 0 ? 1 : 0.84,
                        opacity: abs > 2 ? 0 : rel === 0 ? 1 : 0.45,
                        filter: `blur(${rel === 0 ? 0 : 2.8}px)`,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 220,
                        damping: 28,
                        mass: 0.9,
                      }}
                      className={`absolute left-1/2 top-0 -translate-x-1/2 w-[280px] sm:w-[320px] md:w-[360px] h-[332px] sm:h-[352px] md:h-[380px] rounded-3xl p-6 border overflow-hidden ${
                        rel === 0
                          ? "bg-white/18 border-white/35 shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
                          : "bg-white/10 border-white/18 shadow-[0_14px_30px_rgba(0,0,0,0.2)]"
                      }`}
                      style={{ zIndex: 50 - abs }}
                    >
                      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(115,175,255,0.28),transparent_50%)]" />
                      <div className="relative h-full flex flex-col">
                        <div className="w-11 h-11 rounded-xl border border-white/24 bg-white/14 flex items-center justify-center mb-5">
                          <card.icon
                            size={20}
                            className="text-[rgb(195,223,255)]"
                          />
                        </div>
                        <h3 className="text-white text-[18px] leading-tight mb-3">
                          {card.title}
                        </h3>
                        <p className="text-white/78 text-[13px] leading-relaxed">
                          {card.description}
                        </p>
                        <div className="mt-auto pt-5">
                          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] text-white/82 tracking-wide">
                            {card.detail}
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>

              <div className="mt-7 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Ver capacidad anterior"
                  className="h-10 w-10 rounded-full border border-white/25 bg-white/12 hover:bg-white/20 transition-colors flex items-center justify-center text-white"
                >
                  <ChevronLeft size={18} />
                </button>

                <div className="flex items-center gap-2">
                  {cards.map((card, index) => (
                    <button
                      key={card.title}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Ir a ${card.title}`}
                      className={`h-2.5 rounded-full transition-all ${
                        index === activeIndex
                          ? "w-8 bg-white"
                          : "w-2.5 bg-white/40 hover:bg-white/65"
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={next}
                  aria-label="Ver siguiente capacidad"
                  className="h-10 w-10 rounded-full border border-white/25 bg-white/12 hover:bg-white/20 transition-colors flex items-center justify-center text-white"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
