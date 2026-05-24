import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { prisma } from "@/lib/prisma";
import { executeSkill } from "@/lib/claude-skills";
import { SkillId } from "@/lib/skills";

export const maxDuration = 300;

const mp = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

function verifyMPSignature(req: NextRequest, paymentId: string): boolean {
  const secret = process.env.MP_WEBHOOK_SECRET;
  if (!secret) return false;

  const sig = req.headers.get("x-signature") ?? "";
  const rid = req.headers.get("x-request-id") ?? "";
  const tsMatch = sig.match(/ts=(\d+)/);
  const v1Match = sig.match(/v1=([a-f0-9]+)/i);
  if (!tsMatch || !v1Match) return false;

  const template = `id:${paymentId};request-id:${rid};ts:${tsMatch[1]};`;
  const expected = crypto.createHmac("sha256", secret).update(template).digest("hex");
  const received = v1Match[1].toLowerCase();

  if (expected.length !== received.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(received));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.type !== "payment") {
      return NextResponse.json({ ok: true });
    }

    if (!body.data?.id) {
      return NextResponse.json({ ok: true });
    }

    const paymentId = String(body.data.id);

    if (!verifyMPSignature(req, paymentId)) {
      console.error("[webhook/mercadopago] Firma inválida para payment", paymentId);
      return NextResponse.json({ error: "Firma inválida" }, { status: 401 });
    }

    const payment = await new Payment(mp).get({ id: paymentId });

    if (payment.status !== "approved") {
      return NextResponse.json({ ok: true });
    }

    const orderId = payment.external_reference;
    if (!orderId) return NextResponse.json({ ok: true });

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order || order.status !== "pending") {
      return NextResponse.json({ ok: true });
    }

    await prisma.order.update({
      where: { id: orderId },
      data: { status: "paid", mpPaymentId: paymentId },
    });

    await processOrder(orderId, order.skillId as SkillId, order.inputData as Record<string, string>);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[webhook/mercadopago]", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

async function processOrder(
  orderId: string,
  skillId: SkillId,
  inputData: Record<string, string>
) {
  try {
    const result = await executeSkill(skillId, inputData);
    await prisma.order.update({
      where: { id: orderId },
      data: { status: "completed", result },
    });
  } catch (err) {
    console.error("[processOrder]", err);
    await prisma.order.update({
      where: { id: orderId },
      data: { status: "failed" },
    });
  }
}
