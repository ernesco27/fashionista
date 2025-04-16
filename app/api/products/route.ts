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
      salesPrice: true,
      status: true,
      createdAt: true,
      description: true,
      fullDescription: true,
      sku: true,
      isAvailable: true,
      featured: true,
      materialType: true,
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
      reviews: {
        select: {
          rating: true,
          comment: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              isActive: true,
              firstName: true,
              lastName: true,
              photo: true,
              emailVerified: true,
            },
          },
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
      variants: {
        select: {
          id: true,
          name: true,
          link: true,
          slug: true,
          values: {
            select: {
              id: true,
              value: true,
              hexCode: true,
            },
          },
        },
      },
      productItems: {
        select: {
          id: true,
          sku: true,
          price: true,
          quantity: true,
          variantValues: {
            select: {
              id: true,
              value: true,
              variantId: true,
              variant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return NextResponse.json(productData);
}
