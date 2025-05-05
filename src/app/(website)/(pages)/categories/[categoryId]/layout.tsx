"use client";

import React from "react";
import { CategoryContext } from "./CategoryContext";
import useSWR from "swr";
import { Category, Product } from "@/types";

const CategoryLayout = ({ children }: { children: React.ReactNode }) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data: categoryData } = useSWR<Category[]>("/api/categories", fetcher);

  const { data: productData } = useSWR<Product[]>("/api/products", fetcher);

  return (
    <CategoryContext.Provider value={{ categoryData, productData }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryLayout;
