import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const slideImages = await prisma.slide.findMany({
    select: {
      id: true,
      title: true,
      link: true,
      description: true,
      order: true,
      subTitle: true,
      btn: true,
      textColor: true,
      image: true,
      slug: true,
    },
  });

  return NextResponse.json(slideImages);
}
