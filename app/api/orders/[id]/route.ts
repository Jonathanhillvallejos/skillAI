import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    select: { id: true, skillId: true, status: true, result: true, createdAt: true },
  });

  if (!order) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

  return NextResponse.json(order);
}
