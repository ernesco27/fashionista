"use client";

import PageHeader from "@/components/custom/PageHeader";
import { ProductContext } from "./ProductContext";
import { useEffect, useState } from "react";
import React from "react";
import { Product } from "@/types";

export default function ProductLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ productId: string }>;
}) {
  const resolvedParams = React.use(params);
  const [productData, setProductData] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `/api/products/${resolvedParams.productId}`,
        );
        const data = await response.json();
        setProductData(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [resolvedParams.productId]);

  return (
    <ProductContext.Provider value={{ productData }}>
      <PageHeader
        heading="Product Details"
        link1="products"
        link2={productData?.name}
      />
      {children}
    </ProductContext.Provider>
  );
}
