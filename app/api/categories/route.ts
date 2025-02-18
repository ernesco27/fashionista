import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const catData = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      link: true,
      slug: true,
      subcategory: true,
    },
  });

  return NextResponse.json(catData);
}
