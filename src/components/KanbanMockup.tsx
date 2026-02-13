"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Phone, Truck, CheckCircle2, Clock } from "lucide-react";

const columns = [
  { id: "pending", title: "Pendiente", color: "#F59E0B" },
  { id: "transit", title: "En Tránsito", color: "#6366F1" },
  { id: "delivered", title: "Entregado", color: "#10B981" },
];

interface Card {
  id: string;
  driver: string;
  route: string;
  column: string;
}

const initialCards: Card[] = [
  { id: "1", driver: "Carlos M.", route: "BUE → CBA", column: "pending" },
  { id: "2", driver: "Laura G.", route: "ROS → MZA", column: "transit" },
  { id: "3", driver: "Diego R.", route: "MDQ → BUE", column: "delivered" },
  { id: "4", driver: "Ana P.", route: "CBA → TUC", column: "pending" },
];

export default function KanbanMockup() {
  const [cards, setCards] = useState(initialCards);
  const [callingCard, setCallingCard] = useState<string | null>(null);
  const [showWave, setShowWave] = useState(false);

  useEffect(() => {
    const runCycle = () => {
      const card = initialCards.filter((c) => c.column === "pending")[0];
      setCallingCard(card.id);
      setShowWave(true);

      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === card.id ? { ...c, column: "transit" } : c
          )
        );
        setCallingCard(null);
        setShowWave(false);
      }, 2500);

      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === card.id ? { ...c, column: "delivered" } : c
          )
        );
      }, 5000);

      setTimeout(() => {
        setCards(initialCards);
      }, 8000);
    };

    const firstTimeout = setTimeout(runCycle, 1500);
    const interval = setInterval(runCycle, 9000);

    return () => {
      clearInterval(interval);
      clearTimeout(firstTimeout);
    };
  }, []);

  return (
    <div className="relative">
      {/* Outer glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-indigo-600/15 via-violet-600/10 to-indigo-600/15 rounded-3xl blur-2xl" />

      <div className="relative glass-card p-5 md:p-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-[10px] text-gray-500 font-mono tracking-wider">
            suplai.app/dashboard
          </span>
          <AnimatePresence>
            {showWave && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-1.5"
              >
                <Phone size={10} className="text-indigo-400" />
                <div className="flex items-end gap-[2px] h-3.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="w-[3px] bg-indigo-400 rounded-full waveform-bar"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
                <span className="text-[9px] text-indigo-400 font-medium">
                  IA activa
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-3 gap-2.5">
          {columns.map((col, colIdx) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.6 + colIdx * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="bg-white/[0.015] rounded-xl p-2.5"
            >
              <div className="flex items-center gap-1.5 mb-2.5 px-1">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: col.color }}
                />
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                  {col.title}
                </span>
                <span className="text-[9px] text-gray-600 ml-auto font-mono">
                  {cards.filter((c) => c.column === col.id).length}
                </span>
              </div>

              <div className="space-y-1.5 min-h-[110px]">
                <AnimatePresence mode="popLayout">
                  {cards
                    .filter((c) => c.column === col.id)
                    .map((card) => (
                      <motion.div
                        key={card.id}
                        layout
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                        className={`p-2.5 rounded-lg transition-all duration-300 ${
                          callingCard === card.id
                            ? "bg-indigo-500/10 border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                            : "bg-white/[0.03] border border-white/[0.04]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-semibold text-white/90">
                            {card.driver}
                          </span>
                          {callingCard === card.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="pulse-glow w-1.5 h-1.5 rounded-full bg-indigo-400"
                            />
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          {card.column === "pending" && (
                            <Clock size={9} className="text-amber-500/70" />
                          )}
                          {card.column === "transit" && (
                            <Truck size={9} className="text-indigo-400/70" />
                          )}
                          {card.column === "delivered" && (
                            <CheckCircle2
                              size={9}
                              className="text-emerald-400/70"
                            />
                          )}
                          <span className="text-[9px] text-gray-500 font-mono">
                            {card.route}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
