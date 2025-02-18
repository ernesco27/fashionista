import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const productData = await prisma.products.findMany({
    select: {
      id: true,
      name: true,
      link: true,
      slug: true,
      images: true,
      price: true,
      status: true,
      createdAt: true,
      description: true,
      sku: true,
      isAvailable: true,
      subcategory: {
        select: {
          name: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
      brand: {
        select: {
          name: true,
        },
      },
      variants: {
        select: {
          name: true,
          price: true,
        },
      },
      reviews: {
        select: {
          rating: true,
        },
      },
      tags: {
        select: {
          name: true,
        },
      },
      attributes: {
        select: {
          value: true,
        },
      },
      relatedProducts: {
        select: {
          productId: true,
        },
      },
      wishlist: {
        select: {
          productId: true,
        },
      },
      likes: {
        select: {
          productId: true,
        },
      },
      discounts: {
        select: {
          name: true,
          value: true,
        },
      },
    },
  });

  return NextResponse.json(productData);
}
