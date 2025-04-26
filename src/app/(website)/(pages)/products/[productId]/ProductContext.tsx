import { createContext, useContext } from "react";

export const ProductContext = createContext<{
  productData: any;
} | null>(null);

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
