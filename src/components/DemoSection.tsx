"use client";

import { m as motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  Phone,
  PhoneOff,
  CheckCircle2,
  Truck,
  ArrowRight,
  Play,
  RotateCcw,
  Sparkles,
  Clock,
  Zap,
} from "lucide-react";

// Typewriter effect component
function TypewriterText({
  text,
  speed = 25,
  onComplete,
  className,
}: {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed]);

  return (
    <span className={className}>
      {displayed}
      {!done && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-[2px] h-[12px] bg-[rgb(45,68,204)] ml-[1px] align-middle rounded-full"
        />
      )}
    </span>
  );
}

type DemoPhase = "idle" | "ringing" | "connected" | "talking" | "processing" | "done";
const INITIAL_PHONE = "+54 9 11 5555-1234";

const sanitizePhoneInput = (value: string) => value.replace(/[^\d+\-() ]/g, "");
const hasValidPhone = (value: string) => value.replace(/\D/g, "").length >= 8;

export default function DemoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [phase, setPhase] = useState<DemoPhase>("idle");
  const [cardColumn, setCardColumn] = useState<"transit" | "delivered">("transit");
  const [showMsg1, setShowMsg1] = useState(false);
  const [showMsg2, setShowMsg2] = useState(false);
  const [showMsg3, setShowMsg3] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [ringCount, setRingCount] = useState(0);
  const [phoneInput, setPhoneInput] = useState(INITIAL_PHONE);
  const [targetPhone, setTargetPhone] = useState(INITIAL_PHONE);
  const [phoneError, setPhoneError] = useState("");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutsRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  const isRunning = phase !== "idle" && phase !== "done";

  const clearScheduledPhases = useCallback(() => {
    timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    timeoutsRef.current = [];
  }, []);

  useEffect(() => {
    if (phase === "connected" || phase === "talking" || phase === "processing") {
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "ringing") return;
    const interval = setInterval(() => {
      setRingCount((prev) => prev + 1);
    }, 600);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    return () => {
      clearScheduledPhases();
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [clearScheduledPhases]);

  const resetDemo = useCallback(() => {
    clearScheduledPhases();
    setPhase("idle");
    setCardColumn("transit");
    setShowMsg1(false);
    setShowMsg2(false);
    setShowMsg3(false);
    setCallDuration(0);
    setRingCount(0);
  }, [clearScheduledPhases]);

  const startCall = useCallback(() => {
    const phone = phoneInput.trim();
    if (!hasValidPhone(phone)) {
      setPhoneError("Ingresá un teléfono válido (mínimo 8 dígitos).");
      return;
    }

    setPhoneError("");
    setTargetPhone(phone);
    resetDemo();

    setPhase("ringing");
    const schedulePhase = (callback: () => void, delay: number) => {
      const timeout = setTimeout(callback, delay);
      timeoutsRef.current.push(timeout);
    };

    schedulePhase(() => {
      setPhase("connected");
      setShowMsg1(true);
    }, 2000);

    schedulePhase(() => {
      setPhase("talking");
      setShowMsg2(true);
    }, 5500);

    schedulePhase(() => {
      setPhase("processing");
      setShowMsg3(true);
    }, 8500);

    schedulePhase(() => {
      setPhase("done");
      setCardColumn("delivered");
    }, 11500);
  }, [phoneInput, resetDemo]);

  const formatDuration = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const getPhaseIndex = () => {
    switch (phase) {
      case "ringing": return 0;
      case "connected": return 1;
      case "talking": return 2;
      case "processing": return 3;
      case "done": return 4;
      default: return -1;
    }
  };

  const stepLabels = [
    "Llamando...",
    "Conectado",
    "Escuchando",
    "Procesando",
    "Completado",
  ];

  return (
    <section id="demo" className="relative py-32 px-6 lg:px-8" ref={ref}>
      <div className="section-divider mb-32" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="text-center mb-16"
        >
          <div className="badge mx-auto mb-6">
            <Sparkles size={14} className="text-[rgb(45,68,204)]" />
            Demo interactiva
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-[-0.02em] mb-4">
            Mirá la <span className="gradient-text">IA en acción</span>
          </h2>
          <p className="text-slate-500 text-[15px] max-w-md mx-auto">
            Cargá tu teléfono, tocá la llamada y mirá cómo la IA ejecuta todo el flujo en vivo.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative"
        >
          {/* Glow */}
          <motion.div
            animate={
              isRunning
                ? { opacity: [0.08, 0.16, 0.08], scale: [1, 1.02, 1] }
                : { opacity: 0.06, scale: 1 }
            }
            transition={isRunning ? { duration: 2, repeat: Infinity } : {}}
            className="absolute -inset-6 bg-gradient-to-r from-[rgb(45,68,204)] via-[rgb(115,175,255)] to-[rgb(45,68,204)] rounded-[40px] blur-2xl"
          />

          <div className="relative glass-card rounded-2xl md:rounded-3xl overflow-hidden">
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8 pb-0">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                <span className="text-[10px] text-slate-400 ml-3 font-sans tracking-wider">
                  suplai.app/demo
                </span>
              </div>

              <div className="flex items-center gap-3">
                <AnimatePresence>
                  {isRunning && (
                    <motion.div
                      key="live-indicator"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20"
                    >
                      <motion.div
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-red-500"
                      />
                      <span className="text-[9px] font-bold text-red-400 uppercase tracking-wider">
                        Live
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {phase === "done" && (
                  <button
                    onClick={resetDemo}
                    className="flex items-center gap-1.5 text-[11px] text-[rgb(45,68,204)] hover:text-[rgb(70,118,228)] transition-colors border border-[rgba(45,68,204,0.2)] px-3 py-1.5 rounded-lg hover:bg-[rgba(45,68,204,0.06)]"
                  >
                    <RotateCcw size={11} />
                    Reiniciar
                  </button>
                )}
              </div>
            </div>

            {/* Main content */}
            <div className="p-6 md:p-10">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                {/* LEFT: CALL SIMULATION */}
                <div>
                  <p className="text-[10px] font-bold text-slate-400 mb-5 uppercase tracking-[0.15em]">
                    Agente IA
                  </p>

                  <div className="bg-[rgba(45,68,204,0.03)] border border-[rgba(45,68,204,0.1)] rounded-2xl p-5 mb-5">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3.5">
                        <div className="relative">
                          <motion.div
                            animate={
                              phase === "ringing"
                                ? {
                                    boxShadow: [
                                      "0 0 0 0px rgba(45,68,204,0.3)",
                                      "0 0 0 12px rgba(45,68,204,0)",
                                    ],
                                  }
                                : {}
                            }
                            transition={
                              phase === "ringing"
                                ? { duration: 1, repeat: Infinity }
                                : {}
                            }
                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                              phase === "ringing"
                                ? "bg-[rgba(45,68,204,0.2)]"
                                : phase === "connected" || phase === "talking"
                                ? "bg-[rgba(45,68,204,0.15)]"
                                : phase === "processing"
                                ? "bg-amber-500/15"
                                : phase === "done"
                                ? "bg-emerald-500/15"
                                : "bg-[rgba(45,68,204,0.06)]"
                            }`}
                          >
                            {phase === "idle" && <PhoneOff size={20} className="text-slate-400" />}
                            {phase === "ringing" && (
                              <motion.div animate={{ rotate: [0, -15, 15, -15, 15, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.5 }}>
                                <Phone size={20} className="text-[rgb(45,68,204)]" />
                              </motion.div>
                            )}
                            {(phase === "connected" || phase === "talking") && (
                              <Phone size={20} className="text-[rgb(45,68,204)]" />
                            )}
                            {phase === "processing" && (
                              <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                                <Zap size={20} className="text-amber-400" />
                              </motion.div>
                            )}
                            {phase === "done" && <CheckCircle2 size={20} className="text-emerald-400" />}
                          </motion.div>
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            Carlos M.
                          </p>
                          <p className="text-[11px] text-slate-400 font-sans">
                            {targetPhone}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        {phase === "ringing" && (
                          <motion.p
                            animate={{ opacity: [1, 0.4, 1] }}
                            transition={{ duration: 1.2, repeat: Infinity }}
                            className="text-[11px] text-[rgb(45,68,204)] font-medium"
                          >
                            Llamando{".".repeat((ringCount % 3) + 1)}
                          </motion.p>
                        )}
                        {(phase === "connected" || phase === "talking" || phase === "processing") && (
                          <div className="flex items-center gap-1.5">
                            <Clock size={10} className="text-slate-400" />
                            <span className="text-[11px] font-sans text-slate-500">
                              {formatDuration(callDuration)}
                            </span>
                          </div>
                        )}
                        {phase === "done" && (
                          <span className="text-[11px] text-emerald-400 font-medium">
                            Finalizada
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Waveform */}
                    <AnimatePresence>
                      {(phase === "connected" || phase === "talking") && (
                        <motion.div
                          key="call-waveform"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 40 }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4 }}
                          className="flex items-end justify-center gap-[2px] mb-5 overflow-hidden"
                        >
                          {Array.from({ length: 32 }).map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-[3px] rounded-full"
                              style={{
                                background:
                                  phase === "talking"
                                    ? "linear-gradient(to top, rgba(45,68,204,0.3), rgba(115,175,255,0.8))"
                                    : "linear-gradient(to top, rgba(45,68,204,0.15), rgba(115,175,255,0.4))",
                              }}
                              animate={{
                                height:
                                  phase === "talking"
                                    ? [3, 8 + ((i * 7) % 26), 3]
                                    : [3, 4 + ((i * 5) % 10), 3],
                              }}
                              transition={{
                                duration: 0.35 + ((i * 3) % 6) * 0.08,
                                repeat: Infinity,
                                delay: i * 0.03,
                              }}
                            />
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Processing indicator */}
                    <AnimatePresence>
                      {phase === "processing" && (
                        <motion.div
                          key="processing-indicator"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-center justify-center gap-2 py-3 mb-5 rounded-xl bg-amber-500/[0.05] border border-amber-500/10"
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          >
                            <Zap size={13} className="text-amber-400" />
                          </motion.div>
                          <span className="text-[11px] text-amber-400 font-medium">
                            IA analizando respuesta...
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Chat messages */}
                    <div className="space-y-3 min-h-[140px]">
                      <AnimatePresence>
                        {showMsg1 && (
                          <motion.div
                            key="ai-msg-1"
                            initial={{ opacity: 0, y: 10, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          >
                            <div className="flex items-start gap-2">
                              <div className="w-5 h-5 rounded-md bg-[rgba(45,68,204,0.12)] flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Sparkles size={10} className="text-[rgb(45,68,204)]" />
                              </div>
                              <div className="bg-[rgba(45,68,204,0.04)] border border-[rgba(45,68,204,0.12)] rounded-xl rounded-tl-sm px-3.5 py-2.5">
                                <p className="text-[11px] text-[rgba(80,127,232,0.9)] leading-relaxed">
                                  <TypewriterText
                                    text='Hola Carlos, te llamo de Suplai. ¿Podés confirmar el estado de tu envío BUE → CBA?'
                                    speed={22}
                                  />
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {showMsg2 && (
                          <motion.div
                            key="driver-msg-1"
                            initial={{ opacity: 0, y: 10, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="flex justify-end"
                          >
                            <div className="bg-[rgba(45,68,204,0.08)] border border-[rgba(45,68,204,0.12)] rounded-xl rounded-tr-sm px-3.5 py-2.5 max-w-[85%]">
                              <p className="text-[11px] text-slate-600 leading-relaxed">
                                <TypewriterText
                                  text='Sí, ya entregué todo hace 20 minutos en el depósito de Córdoba.'
                                  speed={28}
                                />
                              </p>
                            </div>
                          </motion.div>
                        )}

                        {showMsg3 && (
                          <motion.div
                            key="ai-msg-2"
                            initial={{ opacity: 0, y: 10, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          >
                            <div className="flex items-start gap-2">
                              <div className="w-5 h-5 rounded-md bg-[rgba(45,68,204,0.12)] flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Sparkles size={10} className="text-[rgb(45,68,204)]" />
                              </div>
                              <div className="bg-[rgba(45,68,204,0.04)] border border-[rgba(45,68,204,0.12)] rounded-xl rounded-tl-sm px-3.5 py-2.5">
                                <p className="text-[11px] text-[rgba(80,127,232,0.9)] leading-relaxed">
                                  <TypewriterText
                                    text='Perfecto Carlos, actualizo el estado a Entregado. ¡Gracias!'
                                    speed={22}
                                  />
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Steps progress bar with shimmer */}
                  <div className="flex items-center gap-1">
                    {stepLabels.map((label, idx) => {
                      const active = idx <= getPhaseIndex();
                      const current = idx === getPhaseIndex();
                      return (
                        <div key={idx} className="flex items-center gap-1 flex-1">
                          <div className="flex-1 relative">
                            <div className="h-[3px] rounded-full bg-[rgba(45,68,204,0.06)]" />
                            <motion.div
                              className={`absolute inset-y-0 left-0 rounded-full ${active ? "shimmer" : "bg-transparent"}`}
                              initial={{ width: "0%" }}
                              animate={{ width: active ? "100%" : "0%" }}
                              transition={{ duration: 0.5, ease: "easeOut" }}
                            />
                          </div>
                          {current && (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-[8px] font-medium text-[rgb(45,68,204)] whitespace-nowrap"
                            >
                              {label}
                            </motion.span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* RIGHT: KANBAN + START BUTTON */}
                <div className="flex flex-col">
                  <p className="text-[10px] font-bold text-slate-400 mb-5 uppercase tracking-[0.15em]">
                    Tablero Kanban
                  </p>

                  <div className="bg-[rgba(45,68,204,0.03)] border border-[rgba(45,68,204,0.1)] rounded-2xl p-4 mb-5">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-[0.12em]">
                        Probalo con tu número
                      </span>
                      <span className="text-[9px] text-[rgba(70,118,228,0.7)] font-medium uppercase tracking-wider">
                        Demo sin backend
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-2.5">
                      <input
                        type="tel"
                        value={phoneInput}
                        onChange={(event) => {
                          setPhoneInput(sanitizePhoneInput(event.target.value));
                          if (phoneError) setPhoneError("");
                        }}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") startCall();
                        }}
                        placeholder="+54 9 11 5555-1234"
                        disabled={isRunning}
                        className="flex-1 h-10 px-3 rounded-xl bg-[rgba(45,68,204,0.04)] border border-[rgba(45,68,204,0.15)] text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[rgba(45,68,204,0.4)] focus:shadow-[0_0_0_3px_rgba(45,68,204,0.08)] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                      <button
                        onClick={startCall}
                        disabled={isRunning}
                        className="h-10 w-10 rounded-xl border border-[rgba(45,68,204,0.2)] bg-[rgba(45,68,204,0.08)] text-[rgb(70,118,228)] hover:bg-[rgba(45,68,204,0.15)] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
                        aria-label="Iniciar llamada"
                      >
                        <Phone size={14} />
                      </button>
                    </div>

                    <AnimatePresence>
                      {phoneError && (
                        <motion.p
                          key="phone-input-error"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="text-[11px] text-rose-400 mb-2.5"
                        >
                          {phoneError}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <motion.button
                      onClick={startCall}
                      whileHover={!isRunning ? { scale: 1.01 } : {}}
                      whileTap={!isRunning ? { scale: 0.99 } : {}}
                      disabled={isRunning}
                      className="relative overflow-hidden w-full rounded-xl border border-[rgba(45,68,204,0.15)] bg-gradient-to-br from-[rgba(45,68,204,0.06)] via-[rgba(115,175,255,0.08)] to-transparent px-4 py-3 flex items-center gap-3 text-left disabled:opacity-80 disabled:cursor-not-allowed"
                    >
                      <motion.div
                        animate={
                          isRunning
                            ? { boxShadow: ["0 0 0 0 rgba(45,68,204,0.45)", "0 0 0 12px rgba(45,68,204,0)"] }
                            : { boxShadow: "0 0 0 0 rgba(45,68,204,0)" }
                        }
                        transition={isRunning ? { duration: 1.2, repeat: Infinity } : {}}
                        className="w-11 h-11 rounded-full bg-[rgba(45,68,204,0.15)] border border-[rgba(45,68,204,0.3)] flex items-center justify-center shrink-0"
                      >
                        <motion.div
                          animate={phase === "ringing" ? { rotate: [0, -18, 18, -18, 18, 0] } : {}}
                          transition={phase === "ringing" ? { duration: 0.55, repeat: Infinity, repeatDelay: 0.4 } : {}}
                        >
                          <Phone size={18} className="text-[rgb(70,118,228)]" />
                        </motion.div>
                      </motion.div>

                      <div className="min-w-0">
                        <p className="text-[13px] text-slate-900 font-semibold leading-tight">
                          {phase === "done"
                            ? "Llamada completada. Tocá para repetir."
                            : isRunning
                            ? "Llamando ahora..."
                            : "Tocá esta llamada para ejecutar la demo"}
                        </p>
                        <p className="text-[11px] text-[rgba(70,118,228,0.7)] font-sans truncate mt-1">
                          {phoneInput.trim() || "Ingresá un teléfono para continuar"}
                        </p>
                      </div>

                      <ArrowRight
                        size={15}
                        className={`ml-auto shrink-0 transition-all duration-300 ${
                          isRunning
                            ? "opacity-30"
                            : "opacity-50"
                        }`}
                      />
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {/* In Transit column */}
                    <div className="bg-[rgba(45,68,204,0.03)] border border-[rgba(45,68,204,0.1)] rounded-xl p-3.5">
                      <div className="flex items-center gap-1.5 mb-3.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[rgb(45,68,204)]" />
                        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                          En Tránsito
                        </span>
                      </div>
                      <AnimatePresence>
                        {cardColumn === "transit" && (
                          <motion.div
                            key="transit-card"
                            layout
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0, x: 40, scale: 0.85 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className={`p-3 rounded-lg bg-white/60 border transition-all duration-500 ${
                              isRunning
                                ? "border-[rgba(45,68,204,0.25)] shadow-[0_0_15px_rgba(45,68,204,0.08)]"
                                : "border-[rgba(45,68,204,0.12)]"
                            }`}
                          >
                            <div className="flex items-center gap-1.5 mb-1">
                              <Truck size={11} className="text-[rgb(45,68,204)]" />
                              <span className="text-[10px] font-semibold text-slate-800">
                                Carlos M.
                              </span>
                            </div>
                            <span className="text-[9px] text-slate-400 font-sans">
                              BUE → CBA
                            </span>
                            {isRunning && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center gap-1 mt-2"
                              >
                                <motion.div
                                  animate={{ opacity: [1, 0.3, 1] }}
                                  transition={{ duration: 1, repeat: Infinity }}
                                  className="w-1 h-1 rounded-full bg-[rgb(45,68,204)]"
                                />
                                <span className="text-[8px] text-[rgb(45,68,204)] font-medium">
                                  IA verificando...
                                </span>
                              </motion.div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {cardColumn === "delivered" && (
                        <div className="h-[72px] border border-dashed border-[rgba(45,68,204,0.1)] rounded-lg flex items-center justify-center">
                          <span className="text-[9px] text-slate-300">Vacío</span>
                        </div>
                      )}
                    </div>

                    {/* Delivered column */}
                    <div className="bg-[rgba(45,68,204,0.03)] border border-[rgba(45,68,204,0.1)] rounded-xl p-3.5">
                      <div className="flex items-center gap-1.5 mb-3.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                          Entregado
                        </span>
                      </div>
                      <AnimatePresence>
                        {cardColumn === "delivered" && (
                          <motion.div
                            key="delivered-card"
                            layout
                            initial={{ opacity: 0, x: -40, scale: 0.85 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="p-3 rounded-lg bg-white/60 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.06)]"
                          >
                            <div className="flex items-center gap-1.5 mb-1">
                              <CheckCircle2 size={11} className="text-emerald-400" />
                              <span className="text-[10px] font-semibold text-slate-800">
                                Carlos M.
                              </span>
                            </div>
                            <span className="text-[9px] text-slate-400 font-sans">
                              BUE → CBA
                            </span>
                            <div className="flex items-center gap-1 mt-2">
                              <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                              <span className="text-[8px] text-emerald-400 font-medium">
                                Sincronizado
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {cardColumn === "transit" && (
                        <div className="h-[72px] border border-dashed border-[rgba(45,68,204,0.1)] rounded-lg flex items-center justify-center">
                          <span className="text-[9px] text-slate-300">
                            Esperando...
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Result notification */}
                  <AnimatePresence>
                    {phase === "done" && (
                      <motion.div
                        key="done-notification"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500/[0.05] border border-emerald-500/10 mb-5"
                      >
                        <CheckCircle2 size={14} className="text-emerald-400" />
                        <span className="text-[11px] text-emerald-400 font-medium">
                          Estado actualizado automáticamente por IA
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* START CALL BUTTON */}
                  <div className="mt-auto">
                    {phase === "idle" ? (
                      <motion.button
                        onClick={startCall}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full glow-button py-4 rounded-2xl text-white font-semibold text-[15px] flex items-center justify-center gap-3 group"
                      >
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                          <Play size={16} className="text-white ml-0.5" />
                        </div>
                        Iniciar llamada de IA
                        <ArrowRight
                          size={16}
                          className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                        />
                      </motion.button>
                    ) : phase === "done" ? (
                      <motion.button
                        onClick={startCall}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 rounded-2xl text-[rgb(45,68,204)] font-semibold text-[15px] flex items-center justify-center gap-3 border border-[rgba(45,68,204,0.2)] bg-[rgba(45,68,204,0.04)] hover:bg-[rgba(45,68,204,0.08)] transition-all"
                      >
                        <RotateCcw size={16} className="text-[rgb(45,68,204)]" />
                        Ejecutar de nuevo
                      </motion.button>
                    ) : (
                      <div className="w-full py-4 rounded-2xl border border-[rgba(45,68,204,0.1)] bg-[rgba(45,68,204,0.03)] flex items-center justify-center gap-3">
                        <motion.div
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="w-2 h-2 rounded-full bg-[rgb(45,68,204)]"
                        />
                        <span className="text-[13px] text-slate-500 font-medium">
                          Llamada en curso...
                        </span>
                        <span className="text-[12px] text-slate-400 font-sans">
                          {formatDuration(callDuration)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
