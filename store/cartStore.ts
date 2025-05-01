import { create } from "zustand";
import { Product } from "@/types";
import { persist } from "zustand/middleware";

interface CartItem extends Product {
  quantity: number;
  selectedVariants?: {
    name: string;
    value: string;
  }[];
  selectedImage?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (
    product: Product,
    quantity?: number,
    selectedVariants?: { name: string; value: string }[],
    selectedImage?: string,
  ) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (
        product,
        quantity = 1,
        selectedVariants = [],
        selectedImage,
      ) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.id === product.id &&
              JSON.stringify(item.selectedVariants) ===
                JSON.stringify(selectedVariants),
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id &&
                JSON.stringify(item.selectedVariants) ===
                  JSON.stringify(selectedVariants)
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                ...product,
                quantity,
                selectedVariants,
                selectedImage: selectedImage || product.images[0]?.link,
              },
            ],
          };
        });
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },
      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item,
          ),
        }));
      },
      clearCart: () => {
        set({ items: [] });
      },
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) =>
            total +
            parseFloat((item.salesPrice || item.price).toString()) *
              item.quantity,
          0,
        );
      },
    }),
    {
      name: "cart-storage", // unique name for localStorage
      skipHydration: true, // skip hydration on first load
    },
  ),
);
