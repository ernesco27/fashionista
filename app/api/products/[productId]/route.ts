import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ productId: string }> },
) {
  const { productId } = await params;

  try {
    const product = await prisma.products.findUnique({
      where: {
        id: parseInt(productId),
      },
      select: {
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
        materialType: true,
        sku: true,
        isAvailable: true,
        featured: true,
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

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 },
    );
  }
}
