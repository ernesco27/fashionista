import { Product, ProductVariantWithValues, ProductItem } from "@/types";
import { ProductVariantValue as PrismaProductVariantValue } from "@prisma/client";
import React, { useMemo } from "react";
import { Label } from "../ui/label";
import { cn, isCombinationAvailable } from "@/lib/utils";

const ProductVariants = ({
  product,
  selectedVariants,
  setSelectedVariants,
}: {
  product: Product;
  selectedVariants: Record<string, string>;
  setSelectedVariants: (
    value:
      | Record<string, string>
      | ((prev: Record<string, string>) => Record<string, string>),
  ) => void;
}) => {
  const handleVariantChange = (variantName: string, value: string) => {
    setSelectedVariants((prev: Record<string, string>) => ({
      ...prev,
      [variantName]: value,
    }));
  };

  // Debug product items
  console.log("Product items:", product.productItems);
  console.log("Selected variants:", selectedVariants);

  // Memoize available options based on current selections
  const availableOptionsMap = useMemo(() => {
    const availableMap: Record<string, Set<string>> = {};
    if (!product.productItems || !product.variants) return availableMap;

    // Initialize sets for each variant type
    for (const variant of product.variants) {
      availableMap[variant.name] = new Set();
    }

    // If no selections have been made yet, all options should be available
    if (Object.keys(selectedVariants).length === 0) {
      console.log("No selections made yet, all options should be available");
      for (const variant of product.variants) {
        variant.values?.forEach((value) => {
          availableMap[variant.name]?.add(value.value);
        });
      }
      return availableMap;
    }

    // For each variant type, check which options are available
    for (const variant of product.variants) {
      // For each option in this variant type
      variant.values?.forEach((option) => {
        // Check if this option is available with current selections
        const isAvailable = isCombinationAvailable(
          product,
          variant.name,
          option.value,
          selectedVariants,
        );

        if (isAvailable) {
          availableMap[variant.name]?.add(option.value);
        }
      });
    }

    // Log the available options for debugging
    console.log("Available options map:", availableMap);

    // For each variant type, check if any options are available
    for (const variant of product.variants) {
      const availableOptions = Array.from(availableMap[variant.name] || []);
      console.log(`Available options for ${variant.name}:`, availableOptions);

      // If no options are available for a variant type, add all options
      if (availableOptions.length === 0) {
        console.log(
          `No options available for ${variant.name}, adding all options`,
        );
        variant.values?.forEach((value) => {
          availableMap[variant.name]?.add(value.value);
        });
      }
    }

    return availableMap;
  }, [product.productItems, product.variants, selectedVariants]);

  return (
    <div className="space-y-2.5 flex flex-col gap-8 mb-10">
      {product.variants?.map((variant: ProductVariantWithValues) => {
        const selectedValue = selectedVariants[variant.name];
        const selectedOptionDetails = variant.values?.find(
          (v) => v.value === selectedValue,
        );
        const isColorVariant = variant.name === "Color";

        return (
          <fieldset key={variant.id} className="space-y-1.5">
            <legend className="mb-4">
              <Label asChild>
                <span className="">
                  {`${variant.name}:`}
                  {selectedValue && (
                    <span className="ml-2 font-normal text-lg ">
                      {isColorVariant && selectedOptionDetails?.hexCode ? (
                        <span className="inline-flex items-center text-lg font-normal">
                          <span
                            className="inline-block w-3 h-3 rounded-full mr-1"
                            style={{
                              backgroundColor: selectedOptionDetails.hexCode,
                            }}
                          />
                          {selectedValue}
                        </span>
                      ) : (
                        selectedValue
                      )}
                    </span>
                  )}
                </span>
              </Label>
            </legend>
            <div className="flex flex-wrap gap-6">
              {variant.values?.map(
                (
                  option: PrismaProductVariantValue & {
                    hexCode?: string | null;
                  },
                ) => {
                  const isSelected =
                    selectedVariants[variant.name] === option.value;
                  const isColorOption =
                    variant.name === "Color" && option.hexCode;
                  const isAvailableBasedOnSelection =
                    availableOptionsMap[variant.name]?.has(option.value) ??
                    false;
                  const isDisabled = !isAvailableBasedOnSelection;

                  return (
                    <div key={option.id} className="flex items-center relative">
                      <input
                        type="radio"
                        id={`${variant.id}-${option.id}`}
                        name={variant.name}
                        value={option.value}
                        checked={isSelected}
                        onChange={() =>
                          handleVariantChange(variant.name, option.value)
                        }
                        disabled={isDisabled}
                        className="peer hidden"
                      />
                      {isColorOption ? (
                        <Label
                          htmlFor={`${variant.id}-${option.id}`}
                          className={cn(
                            "relative w-8 h-8 rounded-full flex items-center justify-center",
                            isDisabled
                              ? "cursor-not-allowed opacity-50"
                              : "cursor-pointer",
                            isSelected && "ring-2 ring-offset-2",
                          )}
                          style={{
                            backgroundColor: option.hexCode ?? undefined,
                            ...(isSelected && option.hexCode
                              ? {
                                  ringColor: option.hexCode,
                                  boxShadow: `0 0 0 2px white, 0 0 0 4px ${option.hexCode}`,
                                }
                              : {}),
                          }}
                        >
                          <span className="sr-only">{option.value}</span>
                          {isDisabled && (
                            <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                              X
                            </span>
                          )}
                        </Label>
                      ) : (
                        <Label
                          htmlFor={`${variant.id}-${option.id}`}
                          className={cn(
                            "flex items-center justify-center min-w-14 gap-1.5 border p-2",
                            isDisabled
                              ? "cursor-not-allowed text-slate-400 bg-slate-100 line-through"
                              : "cursor-pointer",
                            isSelected && !isDisabled
                              ? "bg-primary-500 text-white border-primary-500"
                              : "",
                            isSelected && isDisabled
                              ? "bg-slate-300 text-slate-500 border-slate-400 line-through"
                              : "",
                          )}
                        >
                          {option.value}
                        </Label>
                      )}
                    </div>
                  );
                },
              )}
            </div>
          </fieldset>
        );
      })}
    </div>
  );
};

export default ProductVariants;
