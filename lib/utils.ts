import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Prisma, ProductReview, ProductVariant } from "@prisma/client";
import { Product } from "@/types";
import { auth } from "@clerk/nextjs/server";

interface ProductItemType {
  quantity: number;
  price: Prisma.Decimal;
  sku: string;
  variantValues: Array<{
    variant: {
      name: string;
    };
    value: string;
  }>;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateTostring(name: string) {
  const date = name.substring(0, 10);

  const hours = name.substring(11, 16);

  return date + " " + hours;
}

export const discountPrice = (price: number, discount: number): number => {
  let price_final: number = 0;

  price_final = (price * (100 - discount)) / 100;
  return parseInt(price_final.toFixed(2));
};

export const getDate = (date: Date) => {
  const newDate = new Date(date).toDateString();
  return newDate;
};

export const getRatingNote = (reviews: ProductReview[]): number => {
  const ratingTotal = reviews.reduce(
    (accumulator: number, currentValue: ProductReview): number =>
      accumulator + currentValue?.rating,
    0,
  );
  const rating = (ratingTotal / reviews.length).toFixed(0);

  if (!parseFloat(rating)) {
    return 0;
  }

  return parseFloat(rating);
};

// export const getBestPriceWithDiscountFromProduct = (
//   product: Product
// ): number => {
//   const data = product.variants?.map((variant: ProductVariant) => {
//     return variant.options.map((options: ProductVariantOption) => {
//       return options.discount
//         ? discountPrice(options.price, options.discount)
//         : options.price;
//     });
//   });

//   const sort = data.map((item: Array<number>) => {
//     return item.sort((a: number, b: number) => {
//       return a - b;
//     });
//   });

//   const finalSort = sort
//     .map((item: Array<number>) => {
//       return item[0];
//     })
//     .sort((a: number, b: number) => {
//       return a - b;
//     })[0];

//   return finalSort;
// };

// export const getBestPriceWithoutDiscountFromProduct = (
//   product: Product
// ): number => {
//   const data = product.subProducts.map((subProduct: SubProduct) => {
//     return subProduct.options.map((options: Options) => {
//       return options.price;
//     });
//   });

//   const sort = data.map((item: Array<number>) => {
//     return item.sort((a: number, b: number) => {
//       return a - b;
//     });
//   });

//   const finalSort = sort
//     .map((item: Array<number>) => {
//       return item[0];
//     })
//     .sort((a: number, b: number) => {
//       return a - b;
//     })[0];

//   return finalSort;
// };

export const getDiscountRate = (
  price: number,
  discountPrice: number,
): number => {
  const d = (price - discountPrice) * (100 / price);
  return parseFloat(d.toFixed(2));
};

/**
 * Checks if a specific variant combination is available in the product items
 * @param product The product containing variant items
 * @param currentVariantName The name of the variant being checked
 * @param currentOptionValue The value of the option being checked
 * @param selectedVariants The currently selected variants
 * @returns Boolean indicating if the combination is available
 */
export const isCombinationAvailable = (
  product: any,
  currentVariantName: string,
  currentOptionValue: string,
  selectedVariants: Record<string, string>,
): boolean => {
  if (!product.productItems) return false; // No items defined

  // Build the potential full combination including the current option
  const potentialSelection = {
    ...selectedVariants,
    [currentVariantName]: currentOptionValue,
  };

  // Check if *any* ProductItem matches this potential selection AND has quantity > 0
  return product.productItems.some((item: any) => {
    if (item.quantity <= 0) return false; // Item itself is out of stock

    // Check if this item perfectly matches the potential selection
    let matches = true;
    const requiredVariantNames =
      product.variants?.map((v: any) => v.name) ?? [];

    // Ensure item has values for all required variants
    if (item.variantValues.length !== requiredVariantNames.length) {
      return false;
    }

    for (const requiredName of requiredVariantNames) {
      const selectedValueForCheck = potentialSelection[requiredName];
      // If a required variant isn't in the potential selection yet, we can't determine availability accurately here
      if (!selectedValueForCheck) {
        matches = false;
        break;
      }
      const itemHasValue = item.variantValues.some(
        (vv: any) =>
          vv.variant.name === requiredName &&
          vv.value === selectedValueForCheck,
      );
      if (!itemHasValue) {
        matches = false;
        break;
      }
    }
    return matches;
  });
};

export const findSelectedItemDetails = (
  product: Product | null | undefined,
  selectedVariants: Record<string, string>,
): ProductItemType | null => {
  if (!product?.productItems || Object.keys(selectedVariants).length === 0) {
    return null; // No items or no selections made
  }

  // Check if all required variant types have a selection
  const requiredVariantNames = product.variants?.map((v) => v.name) ?? [];
  const allRequiredSelected = requiredVariantNames.every(
    (name) => selectedVariants[name],
  );

  if (!allRequiredSelected || requiredVariantNames.length === 0) {
    return null; // Not all variants selected yet, or product has no variants defined
  }

  for (const item of product.productItems) {
    // Check if this item's values perfectly match the selection
    let match = true;
    if (item.variantValues.length !== requiredVariantNames.length) {
      match = false; // Item doesn't have the right number of variants defined
      continue;
    }

    for (const requiredName of requiredVariantNames) {
      const selectedValue = selectedVariants[requiredName];
      const itemHasValueForVariant = item.variantValues.some(
        (vv) => vv.variant.name === requiredName && vv.value === selectedValue,
      );
      if (!itemHasValueForVariant) {
        match = false;
        break; // This item doesn't match the selection
      }
    }

    if (match) {
      return item; // Found the matching item
    }
  }

  return null; // No item found for the exact combination
};

// export async function getSessionData() {
//   const authData = await auth();
//   const { sessionClaims, userId } = authData;

//   const role = (sessionClaims?.metadata as { role?: string })?.role;
//   const currentUserId = userId;

//   return { currentUserId, role }; // Return an object with userId and role
// }
