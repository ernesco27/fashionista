"use client";

import Container from "@/components/custom/Container";
import CurrencyFormat from "@/components/custom/CurrencyFormat";
import CustomButton from "@/components/custom/CustomButton";
import PageHeader from "@/components/custom/PageHeader";
import Payments from "@/components/custom/Payments";
import ProductVariants from "@/components/custom/ProductVariants";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import { Product, ProductItem, ProductItemVariantValue } from "@/types";
import { Heart, Star } from "lucide-react";
import Link from "next/link";
import React, { useState, useMemo, useEffect } from "react";
import useSWR from "swr";
import { Prisma } from "@prisma/client";
import { cn, findSelectedItemDetails } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import ProductInfo from "@/components/custom/ProductInfo";
import { useProduct } from "./ProductContext";
import Loading from "./loading";
import ProductMedia from "@/components/modules/Products/ProductMedia";
import { Input } from "@/components/ui/input";
import { NumberField } from "@base-ui-components/react/number-field";
import NumberInput from "@/components/custom/NumberInput";
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

interface Variant {
  name: string;
  values: Array<{
    value: string;
  }>;
}

interface Review {
  rating: number;
}

interface Tag {
  id?: string;
  name: string;
}

const ProductPage = ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  // All hooks at the top in consistent order
  const { productData } = useProduct();
  const resolvedParams = React.use(params);
  const { productId } = resolvedParams;
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});
  const [isInitialized, setIsInitialized] = useState(false);

  console.log("productData", productData);

  // --- Data Processing (Handles Decimals and ProductItems) ---
  const product = useMemo(() => {
    if (!productData) return null;

    return {
      ...productData,
      price: new Prisma.Decimal(productData.price ?? 0),
      salesPrice: productData.salesPrice
        ? new Prisma.Decimal(productData.salesPrice)
        : null,
      variants: productData.variants?.map((variant: any) => ({
        ...variant,
        values: variant.values?.map((value: any) => ({ ...value })),
      })),
      productItems: productData.productItems?.map((item: any) => ({
        ...item,
        price: new Prisma.Decimal(item.price ?? 0),
      })),
    };
  }, [productData]);

  // --- Find Selected Item Details ---
  const selectedItemDetails = useMemo(
    () => (product ? findSelectedItemDetails(product, selectedVariants) : null),
    [product, selectedVariants],
  );

  const availableQuantity = useMemo(() => {
    if (!selectedItemDetails) return 0;
    return selectedItemDetails.quantity;
  }, [selectedItemDetails]);

  // --- Calculate Display Values ---
  const displayPrice =
    selectedItemDetails?.price ?? product?.price ?? new Prisma.Decimal(0);
  // Use product base sales price only if NO specific item is selected, otherwise variant price IS the price
  const displaySalesPrice = selectedItemDetails ? null : product?.salesPrice;
  const originalPriceForStrikeThrough =
    selectedItemDetails?.price &&
    (selectedItemDetails.price as Prisma.Decimal).lt(
      product?.price ?? new Prisma.Decimal(0),
    )
      ? product?.price // Show base price if selected item price is lower
      : displaySalesPrice?.lt(product?.price ?? new Prisma.Decimal(0))
      ? product?.price // Show base price if base sales price is lower
      : null; // No strikethrough needed

  const selectedQuantity = selectedItemDetails?.quantity ?? 0;
  const isSelectedVariantOutOfStock =
    selectedQuantity <= 0 && selectedItemDetails !== null;

  // Convert to numbers for CurrencyFormat
  const priceAsNumber = displayPrice.toNumber();
  const salesPriceAsNumber = displaySalesPrice?.toNumber(); // Will be null if item selected
  const originalPriceAsNumberForStrike =
    originalPriceForStrikeThrough?.toNumber();

  // --- Initialization Effect ---
  useEffect(() => {
    if (
      product &&
      product.variants &&
      product.variants.length > 0 &&
      !isInitialized
    ) {
      let firstAvailableCombination: Record<string, string> | null = null;
      const firstItemInStock = product.productItems?.find(
        (item: ProductItemType) => item.quantity > 0,
      );

      if (firstItemInStock) {
        firstAvailableCombination = {};
        firstItemInStock.variantValues.forEach(
          (vv: ProductItemType["variantValues"][0]) => {
            firstAvailableCombination![vv.variant.name] = vv.value;
          },
        );
      } else {
        firstAvailableCombination = product.variants.reduce(
          (acc: Record<string, string>, variant: Variant) => {
            const firstValue = variant.values?.[0]?.value;
            if (variant.name && firstValue) {
              acc[variant.name] = firstValue;
            }
            return acc;
          },
          {},
        );
      }

      if (
        firstAvailableCombination &&
        Object.keys(firstAvailableCombination).length > 0
      ) {
        setSelectedVariants(firstAvailableCombination);
      }
      setIsInitialized(true);
    }
  }, [product, isInitialized]);

  // --- Render Logic ---
  if (!productData) {
    return (
      // <Container>
      //   <p>Loading...</p>
      // </Container>
      <Loading />
    );
  }

  if (!product) {
    return (
      <Container>
        <p>Product not found</p>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
          {/* Image Column */}

          <ProductMedia media={product.images} />

          {/* Details Column */}
          <div className="flex flex-col gap-4 ">
            <h1 className="capitalize text-2xl lg:text-4xl ">{product.name}</h1>
            {/* Rating (no change) */}
            <span
              className="flex gap-2 items-center 
            "
            >
              <Star fill="#d97706" className="text-primary-600" />
              <p className="font-normal text-xl">
                {product.reviews && product.reviews.length > 0
                  ? (
                      product.reviews.reduce(
                        (sum: number, review: Review) => sum + review.rating,
                        0,
                      ) / product.reviews.length
                    ).toFixed(1)
                  : "0.0"}
              </p>
              <p className="font-normal text-xl">
                ({product.reviews?.length || 0} Reviews)
              </p>
            </span>

            {/* Price Display */}
            <div className="inline-flex justify-between items-center w-full">
              <CurrencyFormat
                value={priceAsNumber} // Always show the current price (either base or item price)
                className="font-bold text-primary-600 text-left text-2xl "
              />
              {/* Show strikethrough only if applicable */}
              {originalPriceAsNumberForStrike && (
                <CurrencyFormat
                  value={originalPriceAsNumberForStrike}
                  className="line-through text-xl text-slate-500 ml-4"
                />
              )}
            </div>

            {/* Description (no change) */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700 font-normal">
                {product.description || "No description available"}
              </p>
            </div>

            {/* Pass productItems to ProductVariants */}
            {product.variants && product.variants.length > 0 && (
              <ProductVariants
                product={product} // Pass full product including items
                selectedVariants={selectedVariants}
                setSelectedVariants={setSelectedVariants}
              />
            )}

            {/* Size Guide (no change) */}
            <div className="capitalize underline cursor-pointer mb-2 text-lg">
              <p>View Size Guide</p>
            </div>

            {/* Stock Status */}
            {selectedItemDetails && (
              <div
                className={cn(
                  " max-w-[120px] max-h-[40px] flex items-center justify-center",
                  isSelectedVariantOutOfStock
                    ? "border border-red-400 bg-red-100"
                    : " border-2 border-green-400 bg-green-100",
                )}
              >
                <p
                  className={cn(
                    "text-lg",
                    isSelectedVariantOutOfStock
                      ? "text-red-600 font-semibold"
                      : "text-green-600",
                  )}
                >
                  {isSelectedVariantOutOfStock
                    ? "Out of Stock"
                    : `${selectedQuantity} in Stock`}
                </p>
              </div>
            )}
            {!selectedItemDetails &&
              Object.keys(selectedVariants).length > 0 &&
              product.variants &&
              product.variants.length > 0 && (
                <p className="text-sm text-orange-600">
                  Select all options to see availability
                </p> // Prompt if not all variants selected
              )}

            {/* Action Buttons */}
            <div className="w-full flex flex-wrap lg:flex-nowrap gap-4 items-center  mt-8">
              <div className="flex gap-2.5 items-center">
                <NumberInput
                  quantity={quantity}
                  setQuantity={setQuantity}
                  max={availableQuantity}
                />
              </div>
              <div className="flex gap-2.5  items-center w-full ">
                <CustomButton
                  size="default"
                  name="Add to Cart"
                  primaryColor="white"
                  secondColor="#eab308"
                  outlineColor="#eab308"
                  // Disable if no item matches selection OR if the matched item is out of stock
                  disabled={!selectedItemDetails || isSelectedVariantOutOfStock}
                />
                <CustomButton
                  size="default"
                  name="Buy Now"
                  primaryColor="#eab308"
                  secondColor="white"
                  outlineColor="#eab308"
                  disabled={!selectedItemDetails || isSelectedVariantOutOfStock}
                />
                {/* Wishlist Heart (no change) */}
                <div className="flex justify-center items-center w-[40px] h-[40px] border border-slate-300 rounded-full hover:bg-primary-600 transition-all ">
                  <Heart className="text-primary-600 hover:text-white  " />
                </div>
              </div>
            </div>
            <Separator className="mt-6" />
            <div>
              <p className="font-normal">
                SKU:
                {selectedItemDetails ? selectedItemDetails.sku : ""}
              </p>
              {product.tags && product.tags.length > 0 && (
                <p className="font-normal">
                  Tags:{" "}
                  {product.tags.map((tag: Tag, index: number) => (
                    <span className="text-lg" key={tag.id || index}>
                      {tag.name}
                      {index < (product.tags?.length || 0) - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              )}
            </div>
          </div>
        </div>
      </Container>
      <ProductInfo product={product} />
      <FeaturedProducts />
      <Payments />
    </>
  );
};

export default ProductPage;
