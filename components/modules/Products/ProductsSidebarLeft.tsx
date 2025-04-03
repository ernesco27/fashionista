import HeadingSidebar from "@/components/custom/HeadingSidebar";
import ProductsCatAccordion from "@/components/custom/ProductsCatAccordion";
import { cn } from "@/lib/utils";
import React from "react";

const ProductsSidebarLeft = ({
  minPrice,
  maxPrice,
  loading,
  setMinPrice,
  setMaxPrice,
  setLoading,
  className,
}: {
  minPrice: number;
  maxPrice: number;
  loading: boolean;
  setMinPrice: (v: number) => void;
  setMaxPrice: (v: number) => void;
  setLoading: (v: boolean) => void;
  className?: string;
}) => {
  return (
    <div className={cn("lg:max-w-[300px] h-full", className)}>
      <div className="flex flex-col gap-8 items-center">
        <div className="flex flex-col gap-2 items-center w-full">
          <HeadingSidebar name="Product Categories" />
          <ProductsCatAccordion />
        </div>
      </div>
    </div>
  );
};

export default ProductsSidebarLeft;
