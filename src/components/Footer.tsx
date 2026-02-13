"use client";

const footerLinks = [
  { label: "Problema", href: "#problema" },
  { label: "Solución", href: "#solucion" },
  { label: "Producto", href: "#producto" },
  { label: "Demo", href: "#demo" },
  { label: "Métricas", href: "#metricas" },
];

export default function Footer() {
  return (
    <footer className="relative py-16 px-6 lg:px-8">
      <div className="section-divider mb-16" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <svg width="24" height="24" viewBox="0 0 40 40" fill="none">
              <path
                d="M8 28L20 16L32 28"
                stroke="#6366F1"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 20L20 8L32 20"
                stroke="#A78BFA"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.4"
              />
            </svg>
            <span className="text-sm font-semibold text-white">Suplai</span>
          </a>

          {/* Links */}
          <div className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[12px] text-gray-600 hover:text-gray-400 transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[11px] text-gray-700">
            © {new Date().getFullYear()} Suplai. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
