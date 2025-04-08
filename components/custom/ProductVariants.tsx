import {
  Product,
  ProductVariantWithValues,
  ProductVariantValueWithDetails,
} from "@/types";
import React from "react";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

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
  // const [selectedVariants, setSelectedVariants] = useState<
  //   Record<string, string>
  // >({});

  console.log("product:", product);

  const handleVariantChange = (variantName: string, value: string) => {
    setSelectedVariants((prev: Record<string, string>) => ({
      ...prev,
      [variantName]: value,
    }));
  };

  return (
    <div className="space-y-2.5 flex flex-col gap-8 mb-10">
      {product.variants?.map((variant: ProductVariantWithValues) => {
        const selectedValue = selectedVariants[variant.name];

        // Find the details of the selected value for display (e.g., hex code)
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
            <div className="flex flex-wrap items-center gap-4 ">
              {variant.values?.map((option: ProductVariantValueWithDetails) => {
                const isSelected =
                  selectedVariants[variant.name] === option.value;
                const isColorOption =
                  variant.name === "Color" && option.hexCode;
                const isOutOfStock = option.quantity <= 0;

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
                      disabled={isOutOfStock}
                      className="peer hidden"
                    />
                    {isColorOption ? (
                      <Label
                        htmlFor={`${variant.id}-${option.id}`}
                        className={cn(
                          "relative w-8 h-8 rounded-full flex items-center justify-center",
                          isOutOfStock
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer",
                          isSelected && "ring-2 ring-offset-2 ring-primary-500",
                        )}
                        style={{ backgroundColor: option.hexCode ?? undefined }}
                      >
                        <span className="sr-only">{option.value}</span>
                        {isOutOfStock && (
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
                          isOutOfStock
                            ? "cursor-not-allowed text-slate-400 bg-slate-100 line-through"
                            : "cursor-pointer",
                          isSelected && !isOutOfStock
                            ? "bg-primary-500 text-white border-primary-500"
                            : "",
                          isSelected &&
                            isOutOfStock &&
                            "bg-slate-300 text-slate-500 border-slate-400",
                        )}
                      >
                        {option.value}
                      </Label>
                    )}
                  </div>
                );
              })}
            </div>
          </fieldset>
        );
      })}
    </div>
  );
};

export default ProductVariants;
