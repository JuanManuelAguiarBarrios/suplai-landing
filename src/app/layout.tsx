import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Suplai — Agentes de Voz con IA para Logística",
  description:
    "Automatizá tus operaciones logísticas con agentes de voz con inteligencia artificial. Suplai llama automáticamente a los conductores, interpreta sus respuestas y actualiza tu sistema en tiempo real.",
  openGraph: {
    title: "Suplai — Agentes de Voz con IA para Logística",
    description:
      "Automatizá tus operaciones logísticas con agentes de voz con inteligencia artificial.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
