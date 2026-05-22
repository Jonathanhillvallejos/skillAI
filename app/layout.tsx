import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SkillsIA — Herramientas de IA para tu negocio",
  description:
    "Auditoría SEO y Prospección de clientes con Inteligencia Artificial. Resultados profesionales en minutos.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geist.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <span className="text-white text-sm font-bold">SI</span>
              </div>
              <span className="font-bold text-slate-900 text-lg">SkillsIA</span>
            </a>
            <div className="flex items-center gap-6">
              <a href="#herramientas" className="text-sm text-slate-500 hover:text-slate-900 hidden md:block">
                Herramientas
              </a>
              <a href="#como-funciona" className="text-sm text-slate-500 hover:text-slate-900 hidden md:block">
                Cómo funciona
              </a>
              <a
                href="#herramientas"
                className="bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Comenzar →
              </a>
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="bg-slate-900 text-slate-400">
          <div className="max-w-6xl mx-auto px-6 py-14">
            <div className="grid md:grid-cols-3 gap-10 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">SI</span>
                  </div>
                  <span className="text-white font-bold text-lg">SkillsIA</span>
                </div>
                <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
                  Análisis profesionales con inteligencia artificial para hacer crecer tu negocio.
                  Resultados inmediatos, sin agencias, sin esperas.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Herramientas</h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a href="/skill/auditoria-seo" className="hover:text-white transition-colors flex items-center gap-2">
                      <span>🔍</span> Auditoría SEO Completa
                    </a>
                  </li>
                  <li>
                    <a href="/skill/prospeccion" className="hover:text-white transition-colors flex items-center gap-2">
                      <span>🎯</span> Prospección de Clientes
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Garantías</h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-green-500/15 text-green-400 flex items-center justify-center text-xs">✓</span>
                    Pago seguro con MercadoPago
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-500/15 text-blue-400 flex items-center justify-center text-xs">🛡</span>
                    Garantía de satisfacción 7 días
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-yellow-500/15 text-yellow-400 flex items-center justify-center text-xs">⚡</span>
                    Entrega en menos de 2 minutos
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <p>© 2026 SkillsIA. Todos los derechos reservados.</p>
              <p>Hecho en Chile 🇨🇱</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
