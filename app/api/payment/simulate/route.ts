import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSkill } from "@/lib/skills";
import { executeSkill } from "@/lib/claude-skills";
import { SkillId } from "@/lib/skills";

// Solo disponible en desarrollo
export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "No disponible en producción" }, { status: 403 });
  }

  try {
    const { skillId, formData } = await req.json();

    const skill = getSkill(skillId);
    if (!skill) return NextResponse.json({ error: "Skill no válida" }, { status: 400 });

    const email: string = formData.email?.trim() || "test@skillsia.cl";

    const order = await prisma.order.create({
      data: {
        skillId: skill.id,
        email,
        status: "paid",
        inputData: formData,
        price: skill.price,
        mpPaymentId: "SIMULATED",
      },
    });

    // Ejecutar Claude en background
    executeSkill(skillId as SkillId, formData)
      .then((result) =>
        prisma.order.update({
          where: { id: order.id },
          data: { status: "completed", result },
        })
      )
      .catch((err) => {
        console.error("[executeSkill] ERROR:", err?.message ?? err);
        return prisma.order.update({
          where: { id: order.id },
          data: { status: "failed" },
        });
      });

    return NextResponse.json({
      redirectUrl: `/resultado/${order.id}?status=success`,
    });
  } catch (err) {
    console.error("[payment/simulate]", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
