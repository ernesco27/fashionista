import { createContext, useContext } from "react";

export const CategoryContext = createContext<{
  categoryData: any;
  productData: any;
} | null>(null);

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a ProductProvider");
  }
  return context;
};
