import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { prisma } from "@/lib/prisma";
import { getSkill } from "@/lib/skills";

const mp = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

export async function POST(req: NextRequest) {
  try {
    const { skillId, formData } = await req.json();

    const skill = getSkill(skillId);
    if (!skill) return NextResponse.json({ error: "Skill no válida" }, { status: 400 });

    const email: string = formData.email?.trim();
    if (!email) return NextResponse.json({ error: "El correo es requerido" }, { status: 400 });

    const order = await prisma.order.create({
      data: {
        skillId: skill.id,
        email,
        status: "pending",
        inputData: formData,
        price: skill.price,
      },
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
      || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
    const isProduction = !baseUrl.includes("localhost");

    const preference = await new Preference(mp).create({
      body: {
        items: [
          {
            id: skill.id,
            title: skill.name,
            quantity: 1,
            unit_price: skill.price,
            currency_id: skill.currency,
          },
        ],
        external_reference: order.id,
        back_urls: {
          success: `${baseUrl}/resultado/${order.id}?status=success`,
          failure: `${baseUrl}/resultado/${order.id}?status=failure`,
          pending: `${baseUrl}/resultado/${order.id}?status=pending`,
        },
        ...(isProduction && { auto_return: "approved" }),
      },
    });

    return NextResponse.json({ checkoutUrl: preference.init_point });
  } catch (err) {
    console.error("[payment/create]", err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
