import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { executeSkill } from "@/lib/claude-skills";
import { SkillId } from "@/lib/skills";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-admin-secret");
  if (!secret || secret !== process.env.MP_ACCESS_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { email, orderId } = await req.json();

    let order;
    if (orderId) {
      order = await prisma.order.findUnique({ where: { id: orderId } });
    } else if (email) {
      order = await prisma.order.findFirst({
        where: { email, status: "pending" },
        orderBy: { createdAt: "desc" },
      });
    }

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.status === "completed") {
      return NextResponse.json({ message: "Order already completed", orderId: order.id });
    }

    await prisma.order.update({
      where: { id: order.id },
      data: { status: "paid" },
    });

    // Fire and forget — process async
    (async () => {
      try {
        const result = await executeSkill(
          order.skillId as SkillId,
          order.inputData as Record<string, string>
        );
        await prisma.order.update({
          where: { id: order.id },
          data: { status: "completed", result },
        });
        console.log("[admin/reprocess] completed", order.id);
      } catch (err) {
        console.error("[admin/reprocess] failed", err);
        await prisma.order.update({
          where: { id: order.id },
          data: { status: "failed" },
        });
      }
    })();

    return NextResponse.json({ ok: true, orderId: order.id, skillId: order.skillId });
  } catch (err) {
    console.error("[admin/reprocess]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
