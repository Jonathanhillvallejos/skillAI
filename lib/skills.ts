export type SkillId = "auditoria-seo" | "prospeccion";

export interface SkillField {
  name: string;
  label: string;
  type: "text" | "url" | "email" | "textarea";
  placeholder: string;
  required: boolean;
}

export interface Skill {
  id: SkillId;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  currency: string;
  icon: string;
  fields: SkillField[];
  deliverables: string[];
}

export const SKILLS: Record<SkillId, Skill> = {
  "auditoria-seo": {
    id: "auditoria-seo",
    name: "Auditoría SEO Completa",
    description: "Análisis técnico y estratégico de tu sitio web para mejorar tu posicionamiento en Google.",
    longDescription:
      "Recibe un informe HTML interactivo con scores por categoría, checklist accionable, Core Web Vitals, comparativa vs competidor y plan de acción priorizado.",
    price: 9900,
    currency: "CLP",
    icon: "🔍",
    fields: [
      { name: "url", label: "URL del sitio web", type: "url", placeholder: "https://tusitio.com", required: true },
      { name: "keyword", label: "Keyword objetivo principal", type: "text", placeholder: "Ej: agencia de marketing digital", required: true },
      { name: "negocio", label: "¿A qué se dedica tu negocio?", type: "text", placeholder: "Ej: Venta de ropa online", required: true },
      { name: "competidores", label: "Principales competidores (opcional)", type: "text", placeholder: "competidor1.com, competidor2.com", required: false },
      { name: "email", label: "Tu correo electrónico", type: "email", placeholder: "tu@email.com", required: true },
    ],
    deliverables: [
      "Análisis técnico on-page completo",
      "Diagnóstico de velocidad y Core Web Vitals",
      "Estudio de palabras clave principales",
      "Análisis de competencia",
      "Plan de acción priorizado (10 mejoras clave)",
    ],
  },
  prospeccion: {
    id: "prospeccion",
    name: "Prospección de Clientes",
    description: "Encuentra empresas reales en tu industria y ciudad, calificadas con score, contacto y mensajes listos para enviar.",
    longDescription:
      "Recibe un informe HTML interactivo con 10 empresas reales analizadas, puntuadas y con mensajes de contacto personalizados por canal (email, WhatsApp, LinkedIn).",
    price: 7900,
    currency: "CLP",
    icon: "🎯",
    fields: [
      { name: "servicio", label: "¿Qué servicio o producto ofreces?", type: "text", placeholder: "Ej: Automatización de procesos con IA", required: true },
      { name: "industria", label: "¿En qué industria están tus clientes?", type: "text", placeholder: "Ej: Industrial manufacturera, Restaurantes, Retail", required: true },
      { name: "ciudad", label: "¿En qué ciudad buscamos prospectos?", type: "text", placeholder: "Ej: Santiago, Valparaíso, Concepción", required: true },
      { name: "ticket", label: "Ticket promedio de venta", type: "text", placeholder: "Ej: $500.000 CLP", required: true },
      { name: "email", label: "Tu correo electrónico", type: "email", placeholder: "tu@email.com", required: true },
    ],
    deliverables: [
      "10 empresas reales identificadas y verificadas",
      "Score de oportunidad (0–100) por empresa",
      "Análisis de problemas detectados por empresa",
      "Mensajes listos: email frío, WhatsApp y LinkedIn",
      "Guión de llamada + manejo de objeciones",
    ],
  },
};

export function getSkill(id: string): Skill | null {
  return SKILLS[id as SkillId] ?? null;
}

export function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat("es-CL", { style: "currency", currency }).format(price);
}
