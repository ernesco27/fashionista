import { Metadata } from "next";
import { headers } from "next/headers";

export async function generateMetadata({
  params,
}: {
  params: { productId: string };
}): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  const product = await fetch(
    `${baseUrl}/api/products/${params.productId}`,
  ).then((res) => res.json());

  const mainImage = product.images?.find(
    (image: { isPrimary: boolean; url: string }) => image.isPrimary,
  );

  return {
    title: product?.name || "Product Details",
    description: product?.description || "Your Go To Online Fashion Store",
    icons: {
      icon: "/assets/logo.png",
    },
    openGraph: {
      images: mainImage?.url || "",
    },
  };
}
