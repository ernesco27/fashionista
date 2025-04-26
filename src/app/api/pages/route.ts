import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const pageData = await prisma.pages.findMany({
    select: {
      id: true,
      name: true,
      link: true,
      slug: true,
    },
  });

  return NextResponse.json(pageData);
}
