"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { SKILLS } from "@/lib/skills";
import Link from "next/link";

interface Order {
  id: string;
  skillId: string;
  status: "pending" | "paid" | "completed" | "failed";
  result: string | null;
  createdAt: string;
}

export default function ResultadoPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const mpStatus = searchParams.get("status");

  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");

  const fetchOrder = useCallback(async () => {
    try {
      const res = await fetch(`/api/orders/${params.id}`);
      if (!res.ok) throw new Error("Pedido no encontrado");
      const data: Order = await res.json();
      setOrder(data);
      return data;
    } catch {
      setError("No se pudo cargar el resultado.");
      return null;
    }
  }, [params.id]);

  useEffect(() => { fetchOrder(); }, [fetchOrder]);

  useEffect(() => {
    if (!order || order.status === "completed" || order.status === "failed") return;
    const interval = setInterval(async () => {
      const updated = await fetchOrder();
      if (updated?.status === "completed" || updated?.status === "failed") clearInterval(interval);
    }, 4000);
    return () => clearInterval(interval);
  }, [order, fetchOrder]);

  const skill = order ? SKILLS[order.skillId as keyof typeof SKILLS] : null;

  if (mpStatus === "failure") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center">
          <div className="text-5xl mb-5">❌</div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Pago no completado</h1>
          <p className="text-slate-500 mb-8 text-sm">
            El pago fue cancelado o rechazado. No se realizó ningún cargo a tu cuenta.
          </p>
          <Link
            href="/"
            className="w-full block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-colors"
          >
            Intentar nuevamente
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-slate-500 mb-4">{error}</p>
          <Link href="/" className="text-indigo-600 hover:underline">Volver al inicio</Link>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 text-sm">Cargando tu análisis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-6">

        {/* Header del pedido */}
        <div className="flex items-center gap-3 mb-8">
          <div className="text-4xl">{skill?.icon}</div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">{skill?.name}</h1>
            <p className="text-xs text-slate-400">Pedido #{order.id.slice(0, 8).toUpperCase()}</p>
          </div>
        </div>

        {/* PROCESANDO */}
        {(order.status === "pending" || order.status === "paid") && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-indigo-100 rounded-full" />
              <div className="absolute inset-0 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-2xl">
                {order.status === "pending" ? "💳" : "🤖"}
              </div>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              {order.status === "pending"
                ? "Confirmando tu pago..."
                : "Generando tu análisis con IA..."}
            </h2>
            <p className="text-slate-500 text-sm mb-6">
              {order.status === "pending"
                ? "Estamos verificando el pago con MercadoPago."
                : "Nuestra IA está procesando tu información y creando un análisis personalizado."}
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
            <p className="text-xs text-slate-400 mt-6">No cierres esta página · Tiempo estimado: menos de 2 minutos</p>
          </div>
        )}

        {/* ERROR */}
        {order.status === "failed" && (
          <div className="bg-white rounded-2xl border border-red-200 shadow-sm p-10 text-center">
            <div className="text-5xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Error al generar el análisis</h2>
            <p className="text-slate-500 text-sm mb-6">
              Hubo un problema al procesar tu solicitud. Tu pago fue recibido.
              Contáctanos y lo resolvemos de inmediato.
            </p>
            <a
              href="mailto:soporte@skillsia.cl"
              className="inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors text-sm"
            >
              Contactar soporte →
            </a>
          </div>
        )}

        {/* COMPLETADO */}
        {order.status === "completed" && order.result && (
          <div className="animate-fade-in-up">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-3.5 flex items-center gap-3 mb-6">
              <span className="text-emerald-500 text-lg">✓</span>
              <div>
                <p className="text-emerald-800 font-semibold text-sm">¡Tu análisis está listo!</p>
                <p className="text-emerald-700 text-xs">Generado exclusivamente para tu negocio</p>
              </div>
            </div>

            {(order.skillId === "prospeccion" || order.skillId === "auditoria-seo") && order.result.trim().startsWith("<!DOCTYPE") ? (
              /* HTML skills: renderizar informe interactivo en iframe */
              <div>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
                  <div className="border-b border-slate-100 px-6 py-3 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-700">Informe interactivo</span>
                    <button
                      onClick={() => {
                        const blob = new Blob([order.result!], { type: "text/html" });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `${order.skillId}-${order.id.slice(0, 8)}.html`;
                        a.click();
                      }}
                      className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      ↓ Descargar HTML
                    </button>
                  </div>
                  <iframe
                    srcDoc={order.result}
                    className="w-full border-0"
                    style={{ height: "85vh" }}
                    title="Informe interactivo"
                  />
                </div>
              </div>
            ) : (
              /* Auditoría SEO u otros: renderizar markdown */
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="border-b border-slate-100 px-8 py-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">Análisis completo</span>
                  <button
                    onClick={() => {
                      const blob = new Blob([order.result!], { type: "text/plain" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `${order.skillId}-${order.id.slice(0, 8)}.txt`;
                      a.click();
                    }}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    ↓ Descargar
                  </button>
                </div>
                <div className="p-8">
                  <ResultMarkdown content={order.result} />
                </div>
              </div>
            )}

            <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-slate-900 text-sm">¿Fue útil este análisis?</p>
                <p className="text-slate-500 text-xs">Prueba nuestra otra herramienta</p>
              </div>
              <Link
                href="/"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm shrink-0"
              >
                Ver más herramientas →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ResultMarkdown({ content }: { content: string }) {
  const lines = content.split("\n");
  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        if (line.startsWith("## "))
          return <h2 key={i} className="text-xl font-bold text-slate-900 mt-8 mb-3 first:mt-0">{line.slice(3)}</h2>;
        if (line.startsWith("### "))
          return <h3 key={i} className="text-base font-bold text-slate-800 mt-5 mb-2">{line.slice(4)}</h3>;
        if (line.startsWith("**") && line.endsWith("**") && line.length > 4)
          return <p key={i} className="font-semibold text-slate-800 mt-2">{line.slice(2, -2)}</p>;
        if (line.startsWith("- ") || line.startsWith("* "))
          return (
            <div key={i} className="flex items-start gap-2.5 ml-2">
              <span className="text-indigo-400 mt-1.5 shrink-0 text-xs">●</span>
              <p className="text-slate-700 text-sm leading-relaxed">{line.slice(2)}</p>
            </div>
          );
        if (line.match(/^\d+\./))
          return <p key={i} className="text-slate-700 text-sm leading-relaxed ml-2">{line}</p>;
        if (line.trim() === "")
          return <div key={i} className="h-1" />;
        return <p key={i} className="text-slate-700 text-sm leading-relaxed">{line}</p>;
      })}
    </div>
  );
}
