import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { prisma } from "@/lib/prisma";
import { executeSkill } from "@/lib/claude-skills";
import { SkillId } from "@/lib/skills";

export const maxDuration = 300;

const mp = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // MercadoPago envía topic=payment con data.id
    if (body.type !== "payment") {
      return NextResponse.json({ ok: true });
    }

    const paymentId = String(body.data?.id);
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

    // Ejecutar skill y esperar resultado (maxDuration = 300s)
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
