"use client";

import Image from "next/image";

const footerLinks = [
  { label: "Problema", href: "#problema" },
  { label: "Solución", href: "#solucion" },
  { label: "Capacidades", href: "#producto" },
  { label: "Demo", href: "#demo" },
  { label: "Métricas", href: "#metricas" },
];

export default function Footer() {
  return (
    <footer className="relative py-20 px-6 lg:px-8">
      <div className="section-divider mb-16" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <a href="#" className="flex items-center group">
            <Image
              src="/suplai-logo-black-text.png"
              alt="Suplai"
              width={436}
              height={126}
              sizes="(max-width: 768px) 130px, 160px"
              className="h-9 w-auto shrink-0 group-hover:opacity-80 transition-opacity duration-300"
            />
          </a>

          {/* Links */}
          <div className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link text-[12px] text-slate-400 hover:text-[rgb(45,68,204)] transition-colors duration-300 pb-0.5"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[11px] text-slate-300">
            © {new Date().getFullYear()} Suplai. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
