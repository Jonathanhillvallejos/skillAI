import Link from "next/link";
import { SKILLS, formatPrice } from "@/lib/skills";

const testimonials = [
  {
    name: "Marcela R.",
    role: "Dueña de tienda online",
    text: "La auditoría SEO me dio exactamente lo que necesitaba. En 3 semanas subí del puesto 47 al 12 en Google para mi keyword principal.",
    stars: 5,
  },
  {
    name: "Diego F.",
    role: "Consultor independiente",
    text: "El plan de prospección fue increíblemente detallado. Ya cerré 2 clientes nuevos usando el guión que me entregaron.",
    stars: 5,
  },
  {
    name: "Valentina M.",
    role: "Gerente de marketing",
    text: "Probé otras herramientas antes y ninguna daba resultados tan específicos para mi industria. Totalmente recomendado.",
    stars: 5,
  },
];

const faqs = [
  {
    q: "¿Cuánto tiempo tarda en llegar mi análisis?",
    a: "Tu análisis es generado por inteligencia artificial en tiempo real. Una vez confirmado el pago, recibirás los resultados en menos de 2 minutos directamente en pantalla.",
  },
  {
    q: "¿Qué pasa si no quedo satisfecho?",
    a: "Ofrecemos garantía de satisfacción de 7 días. Si el análisis no cumple tus expectativas, te devolvemos el dinero sin preguntas.",
  },
  {
    q: "¿Es seguro pagar aquí?",
    a: "Sí. Los pagos son procesados íntegramente por MercadoPago, la plataforma de pagos más grande de Latinoamérica. Nosotros nunca vemos ni almacenamos datos de tu tarjeta.",
  },
  {
    q: "¿Puedo guardar o compartir mi análisis?",
    a: "Sí. Puedes descargar el análisis completo en formato texto desde la misma página de resultados.",
  },
  {
    q: "¿Necesito conocimientos técnicos para entender el informe?",
    a: "No. Los informes están redactados en lenguaje claro y accionable, pensados para dueños de negocio, no para técnicos.",
  },
];

export default function Home() {
  const skills = Object.values(SKILLS);

  return (
    <>
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.15),_transparent_60%)]" />
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 relative">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm px-4 py-1.5 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse-slow" />
            Resultados profesionales en menos de 2 minutos
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 max-w-3xl">
            Análisis profesional para tu negocio,{" "}
            <span className="text-indigo-400">sin contratar una agencia</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed">
            Usa el mismo nivel de análisis que las grandes empresas. Inteligencia
            artificial entrenada para darte estrategias concretas, accionables y
            personalizadas para tu negocio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#herramientas"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-xl text-base transition-colors text-center"
            >
              Ver herramientas →
            </a>
            <a
              href="#como-funciona"
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-4 rounded-xl text-base transition-colors text-center"
            >
              Cómo funciona
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 pt-16 border-t border-white/10 max-w-lg">
            {[
              { value: "+500", label: "análisis entregados" },
              { value: "< 2min", label: "tiempo de entrega" },
              { value: "100%", label: "satisfacción garantizada" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-sm text-slate-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" className="py-24 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
              Proceso simple
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              De cero a resultados en menos de 5 minutos
            </h2>
            <p className="text-slate-500 max-w-md mx-auto">
              Sin reuniones, sin esperas de días, sin burocracia.
            </p>
          </div>

          {/* Steps */}
          <div className="relative">
            {/* Línea conectora (solo desktop) */}
            <div className="hidden md:block absolute top-14 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-px">
              <div className="h-full border-t-2 border-dashed border-indigo-200" />
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-10">
              {[
                {
                  step: 1,
                  color: "bg-indigo-600",
                  light: "bg-indigo-50",
                  text: "text-indigo-600",
                  icon: "🎯",
                  title: "Elige tu herramienta",
                  desc: "Auditoría SEO o Prospección de Clientes. Ambas diseñadas para negocios reales que quieren crecer.",
                  tag: "30 segundos",
                },
                {
                  step: 2,
                  color: "bg-violet-600",
                  light: "bg-violet-50",
                  text: "text-violet-600",
                  icon: "📋",
                  title: "Cuéntanos tu negocio",
                  desc: "Completa un formulario simple. Mientras más contexto, más preciso y útil será tu análisis personalizado.",
                  tag: "2 minutos",
                },
                {
                  step: 3,
                  color: "bg-emerald-500",
                  light: "bg-emerald-50",
                  text: "text-emerald-600",
                  icon: "⚡",
                  title: "Recibe tu análisis",
                  desc: "Paga con MercadoPago y la IA genera tu informe al instante. Descárgalo y empieza a aplicarlo hoy.",
                  tag: "Inmediato",
                },
              ].map((item) => (
                <div key={item.step} className="flex flex-col items-center text-center group">
                  {/* Círculo numerado */}
                  <div className="relative mb-8 z-10">
                    <div className={`w-28 h-28 rounded-3xl ${item.light} flex items-center justify-center shadow-sm border border-white group-hover:scale-105 transition-transform duration-200`}>
                      <span className="text-5xl">{item.icon}</span>
                    </div>
                    <div className={`absolute -top-2 -right-2 w-7 h-7 rounded-full ${item.color} text-white text-xs font-bold flex items-center justify-center shadow-md`}>
                      {item.step}
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className={`inline-flex items-center gap-1.5 ${item.light} ${item.text} text-xs font-bold px-3 py-1 rounded-full mb-3`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {item.tag}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA inline */}
          <div className="mt-16 text-center">
            <a
              href="#herramientas"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-xl transition-colors text-base"
            >
              Comenzar ahora →
            </a>
            <p className="text-slate-400 text-xs mt-3">Sin registro · Pago único · Resultado inmediato</p>
          </div>
        </div>
      </section>

      {/* HERRAMIENTAS */}
      <section id="herramientas" className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
              Herramientas IA
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Elige el análisis que necesitas hoy
            </h2>
            <p className="text-slate-500 max-w-md mx-auto">
              Cada informe es generado exclusivamente para tu negocio. No son plantillas genéricas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-start">
            {skills.map((skill) => {
              const isPopular = skill.id === "prospeccion";
              return (
                <div
                  key={skill.id}
                  className={`relative rounded-3xl overflow-hidden transition-transform duration-200 hover:-translate-y-1 ${
                    isPopular
                      ? "ring-2 ring-indigo-500 shadow-2xl shadow-indigo-100"
                      : "border border-slate-200 shadow-md"
                  }`}
                >
                  {/* Badge más popular */}
                  {isPopular && (
                    <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-bold px-4 py-2 text-center tracking-widest uppercase flex items-center justify-center gap-2">
                      <span>⭐</span> Más popular — Elegido por el 70% de los clientes
                    </div>
                  )}

                  <div className="bg-white p-8 md:p-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${isPopular ? "bg-indigo-50" : "bg-slate-50"}`}>
                        {skill.icon}
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-extrabold text-slate-900 tracking-tight">
                          {formatPrice(skill.price, skill.currency)}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">pago único · sin suscripción</div>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{skill.name}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-8">{skill.longDescription}</p>

                    {/* Entregables */}
                    <div className={`rounded-2xl p-5 mb-8 ${isPopular ? "bg-indigo-50" : "bg-slate-50"}`}>
                      <p className={`text-xs font-bold uppercase tracking-widest mb-4 ${isPopular ? "text-indigo-500" : "text-slate-400"}`}>
                        Qué incluye tu análisis
                      </p>
                      <ul className="space-y-3">
                        {skill.deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                            <span className={`mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${isPopular ? "bg-indigo-500" : "bg-slate-400"}`}>
                              ✓
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <Link
                      href={`/skill/${skill.id}`}
                      className={`w-full flex items-center justify-center gap-2 font-bold py-4 rounded-2xl transition-all text-base ${
                        isPopular
                          ? "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-200"
                          : "bg-slate-900 hover:bg-slate-700 text-white"
                      }`}
                    >
                      Obtener mi análisis
                      <span className="text-lg">→</span>
                    </Link>

                    <div className="flex items-center justify-center gap-4 mt-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1">🔒 Pago seguro</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">🛡️ Garantía 7 días</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">⚡ Entrega inmediata</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Nota de confianza */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <span className="text-base">💳</span> Procesado por MercadoPago
            </span>
            <span className="hidden sm:block">·</span>
            <span className="flex items-center gap-2">
              <span className="text-base">🔒</span> Pago 100% seguro
            </span>
            <span className="hidden sm:block">·</span>
            <span className="flex items-center gap-2">
              <span className="text-base">📩</span> Resultado directo en pantalla
            </span>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Lo que dicen nuestros clientes</h2>
            <div className="flex items-center justify-center gap-1 mb-2">
              {"★★★★★".split("").map((s, i) => (
                <span key={i} className="text-yellow-400 text-xl">{s}</span>
              ))}
            </div>
            <p className="text-slate-500 text-sm">4.9/5 basado en más de 500 análisis</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{t.name}</div>
                  <div className="text-slate-400 text-xs">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GARANTÍA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-3xl p-10 md:p-14 text-white text-center">
            <div className="text-5xl mb-5">🛡️</div>
            <h2 className="text-3xl font-bold mb-4">Garantía de satisfacción de 7 días</h2>
            <p className="text-indigo-100 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Si tu análisis no cumple tus expectativas, te devolvemos el 100% de tu dinero.
              Sin burocracia, sin preguntas. Así de simple.
            </p>
            <a
              href="#herramientas"
              className="inline-block bg-white text-indigo-700 font-bold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-colors"
            >
              Comenzar sin riesgo →
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Preguntas frecuentes</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl border border-slate-100 p-6">
                <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(99,102,241,0.2),_transparent_60%)]" />
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-indigo-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-8 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse-slow" />
            Más de 500 análisis entregados
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
            Tu competencia ya está<br />
            <span className="text-indigo-400">tomando mejores decisiones</span>
          </h2>
          <p className="text-slate-300 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            Cada día que pasa sin datos es un día que tu competencia lleva ventaja.
            Obtén tu análisis ahora y empieza a actuar hoy.
          </p>

          {/* Cards de herramientas */}
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
            {skills.map((skill) => {
              const isPopular = skill.id === "prospeccion";
              return (
                <Link
                  key={skill.id}
                  href={`/skill/${skill.id}`}
                  className={`group flex items-center gap-4 p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 ${
                    isPopular
                      ? "bg-indigo-600 border-indigo-500 hover:bg-indigo-500 shadow-xl shadow-indigo-900/40"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  <div className="text-4xl">{skill.icon}</div>
                  <div className="text-left flex-1">
                    <div className="font-bold text-white text-base">{skill.name}</div>
                    <div className={`text-sm mt-0.5 ${isPopular ? "text-indigo-200" : "text-slate-400"}`}>
                      {formatPrice(skill.price, skill.currency)} · pago único
                    </div>
                  </div>
                  <span className="text-white/50 group-hover:text-white transition-colors text-xl">→</span>
                </Link>
              );
            })}
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-[10px]">✓</span>
              Pago 100% seguro
            </span>
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 text-[10px]">⚡</span>
              Resultado inmediato
            </span>
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-[10px]">🛡</span>
              Garantía 7 días
            </span>
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-[10px]">★</span>
              4.9/5 de satisfacción
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
