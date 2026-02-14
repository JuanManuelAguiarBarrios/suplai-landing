import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700"],
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
      <body className={`${inter.variable} ${playfairDisplay.variable} antialiased`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
