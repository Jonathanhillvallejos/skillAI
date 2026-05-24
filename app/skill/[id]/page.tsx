"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { getSkill, formatPrice } from "@/lib/skills";
import Link from "next/link";

export default function SkillPage() {
  const params = useParams();
  const skill = getSkill(params.id as string);

  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!skill) {
    return (
      <div className="max-w-lg mx-auto px-6 py-24 text-center">
        <p className="text-slate-500 mb-4">Herramienta no encontrada.</p>
        <Link href="/" className="text-indigo-600 hover:underline">Volver al inicio</Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const isDev = process.env.NODE_ENV === "development";
      const endpoint = isDev ? "/api/payment/simulate" : "/api/payment/create";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillId: skill.id, formData }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al crear el pago");

      window.location.href = isDev ? data.redirectUrl : data.checkoutUrl;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error inesperado");
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 mb-8">
          ← Volver
        </Link>

        <div className="grid md:grid-cols-5 gap-8 items-start">

          {/* FORMULARIO — izquierda (3 cols) */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{skill.icon}</span>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">{skill.name}</h1>
                  <p className="text-sm text-slate-500">Completa los datos de tu negocio</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {skill.fields.map((field) => (
                  <div key={field.name}>
                    <label htmlFor={`field-${field.name}`} className="block text-sm font-semibold text-slate-700 mb-1.5">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        id={`field-${field.name}`}
                        rows={3}
                        placeholder={field.placeholder}
                        required={field.required}
                        value={formData[field.name] ?? ""}
                        onChange={(e) => setFormData((p) => ({ ...p, [field.name]: e.target.value }))}
                        className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      />
                    ) : (
                      <input
                        id={`field-${field.name}`}
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.required}
                        value={formData[field.name] ?? ""}
                        onChange={(e) => setFormData((p) => ({ ...p, [field.name]: e.target.value }))}
                        className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      />
                    )}
                  </div>
                ))}

                {error && (
                  <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3 flex items-start gap-2">
                    <span>⚠️</span> {error}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors text-base"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Preparando tu pago...
                      </span>
                    ) : (
                      `Pagar ${formatPrice(skill.price, skill.currency)} →`
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { icon: "🔒", text: "Pago seguro" },
                { icon: "⚡", text: "Entrega en 2 min" },
                { icon: "🛡️", text: "Garantía 7 días" },
              ].map((b) => (
                <div key={b.text} className="bg-white border border-slate-100 rounded-xl py-3 px-2 text-center">
                  <div className="text-xl mb-1">{b.icon}</div>
                  <div className="text-xs text-slate-500 font-medium">{b.text}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RESUMEN — derecha (2 cols) */}
          <div className="md:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">
                Resumen de compra
              </h2>
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-sm text-slate-600">{skill.name}</span>
                <span className="font-semibold text-slate-900">{formatPrice(skill.price, skill.currency)}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-sm font-bold text-slate-900">Total</span>
                <span className="text-xl font-bold text-indigo-600">{formatPrice(skill.price, skill.currency)}</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Precio único, sin suscripción ni cobros ocultos</p>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-4 text-sm">Qué recibirás</h3>
              <ul className="space-y-3">
                {skill.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="text-indigo-500 font-bold mt-0.5 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💬</span>
                <div>
                  <p className="text-sm text-slate-700 italic leading-relaxed">
                    "Superó todas mis expectativas. El análisis fue tan detallado que lo usé directamente en mi presentación con inversores."
                  </p>
                  <p className="text-xs text-slate-500 mt-2 font-medium">— Andrés P., CEO startup SaaS</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <img
                src="https://img.shields.io/badge/MercadoPago-Pago%20Seguro-009EE3?style=for-the-badge&logo=mercadopago&logoColor=white"
                alt="MercadoPago Pago Seguro"
                className="mx-auto h-7"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
