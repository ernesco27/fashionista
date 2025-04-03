import { Product } from "@/types";
import { ShoppingBasket } from "lucide-react";
import React from "react";
import ProductCardTwo from "./ProductCardTwo";
import ProductCard from "./ProductCard";

const ProductsContent = ({ products }: { products: Product[] }) => {
  if (products?.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center py-20 px-20 w-full">
        <ShoppingBasket className="font-bold" size="100" />
        <h3>No Product Found</h3>
      </div>
    );
  }
  return (
    <div className="flex justify-center gap-4 flex-wrap p-4">
      {products?.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ProductsContent;
