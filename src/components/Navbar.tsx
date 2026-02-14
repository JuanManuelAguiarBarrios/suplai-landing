"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Problema", href: "#problema" },
  { label: "Solución", href: "#solucion" },
  { label: "Producto", href: "#producto" },
  { label: "Demo", href: "#demo" },
  { label: "Métricas", href: "#metricas" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-2xl border-b border-[rgba(45,68,204,0.16)] shadow-[0_10px_28px_rgba(45,68,204,0.16)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo */}
          <a href="#" className="flex items-center group">
            <Image
              src="/suplai-logo-black-text.png"
              alt="Suplai"
              width={436}
              height={126}
              priority
              className="h-11 w-auto shrink-0"
            />
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-[13px] font-medium text-slate-600 hover:text-[rgb(45,68,204)] transition-colors duration-300 rounded-lg hover:bg-[rgba(115,175,255,0.18)]"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#cta"
            className="hidden lg:inline-flex glow-button text-[13px] font-semibold text-white px-5 py-2 rounded-xl"
          >
            Solicitar demo
          </a>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-[rgb(45,68,204)] p-2 rounded-lg hover:bg-[rgba(115,175,255,0.18)] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white/95 backdrop-blur-2xl border-b border-[rgba(45,68,204,0.16)]"
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-slate-600 hover:text-[rgb(45,68,204)] transition-colors py-2.5 px-3 rounded-lg hover:bg-[rgba(115,175,255,0.18)]"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#cta"
                onClick={() => setMobileOpen(false)}
                className="glow-button text-sm font-semibold text-white px-5 py-2.5 rounded-xl text-center mt-3"
              >
                Solicitar demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
