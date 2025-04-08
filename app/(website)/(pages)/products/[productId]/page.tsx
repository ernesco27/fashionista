"use client";

import Container from "@/components/custom/Container";
import CurrencyFormat from "@/components/custom/CurrencyFormat";
import CustomButton from "@/components/custom/CustomButton";
import PageHeader from "@/components/custom/PageHeader";
import Payments from "@/components/custom/Payments";
import ProductVariants from "@/components/custom/ProductVariants";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import { Product, ProductVariantValueWithDetails } from "@/types";
import { Heart, Star } from "lucide-react";
import Link from "next/link";
import React, { useState, useMemo, useEffect } from "react";
import useSWR from "swr";
import { Prisma } from "@prisma/client";

// Helper function to find the selected variant value combination
const findSelectedVariantValue = (
  product: Product | null | undefined,
  selectedVariants: Record<string, string>,
): ProductVariantValueWithDetails | null => {
  if (!product?.variants || product.variants.length === 0) {
    return null;
  }
  const allVariantsSelected = product.variants.every(
    (variant) => selectedVariants[variant.name],
  );
  if (!allVariantsSelected) {
    return null;
  }
  // Simplified approach (remains the same)
  const firstVariantName = product.variants[0].name;
  const firstSelectedValue = selectedVariants[firstVariantName];
  const foundValue = product.variants[0].values?.find(
    (v) => v.value === firstSelectedValue,
  );
  return foundValue || null;
};

const ProductPage = ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  // --- Hooks at the Top Level ---
  const resolvedParams = React.use(params);
  const { productId } = resolvedParams;

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});
  const [isInitialized, setIsInitialized] = useState(false); // Flag for initialization

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const {
    data: productsData,
    error,
    isLoading,
  } = useSWR<Product[]>("/api/products", fetcher);

  // Process data (convert Decimals) - Safe for null/undefined productsData
  const products = useMemo(() => {
    return (
      productsData?.map((prod) => ({
        ...prod,
        price: new Prisma.Decimal(prod.price ?? 0),
        salesPrice: prod.salesPrice
          ? new Prisma.Decimal(prod.salesPrice)
          : null,
        variants: prod.variants?.map((variant) => ({
          ...variant,
          values: variant.values?.map((value) => ({
            ...value,
            price: new Prisma.Decimal(value.price ?? 0),
          })),
        })),
      })) ?? null
    );
  }, [productsData]);

  // Find the specific product - Safe for null/undefined products
  const product = useMemo(
    () => products?.find((p) => p.id.toString() === productId),
    [products, productId],
  );

  // Calculate selected variant details - Safe for null/undefined product
  const selectedVariantDetails = useMemo(
    () =>
      product ? findSelectedVariantValue(product, selectedVariants) : null,
    [product, selectedVariants],
  );

  // Calculate display prices and stock - Safe for null/undefined product/details
  const displayPrice =
    selectedVariantDetails?.price ?? product?.price ?? new Prisma.Decimal(0);
  const displaySalesPrice = selectedVariantDetails?.price;
  const originalPrice = product?.price ?? new Prisma.Decimal(0);
  const selectedQuantity = selectedVariantDetails?.quantity ?? 0;
  const isSelectedVariantOutOfStock =
    selectedQuantity <= 0 && selectedVariantDetails !== null;

  // Convert to numbers for CurrencyFormat
  const priceAsNumber = displayPrice.toNumber();
  const salesPriceAsNumber = displaySalesPrice?.toNumber();
  const originalPriceAsNumber = originalPrice.toNumber();

  // --- Side Effect for State Initialization ---
  useEffect(() => {
    // Initialize only once after product is loaded and variants exist
    if (
      product &&
      product.variants &&
      product.variants.length > 0 &&
      !isInitialized
    ) {
      const initialSelections = product.variants.reduce((acc, variant) => {
        const firstAvailableValue = variant.values?.find(
          (v) => v.quantity > 0,
        )?.value;
        const valueToSelect = firstAvailableValue ?? variant.values?.[0]?.value;
        if (variant.name && valueToSelect) {
          acc[variant.name] = valueToSelect;
        }
        return acc;
      }, {} as Record<string, string>);
      setSelectedVariants(initialSelections);
      setIsInitialized(true); // Mark as initialized
    }
  }, [product, isInitialized]); // Depend on product and initialization flag

  // --- Loading/Error States (Now after all hooks) ---
  if (isLoading)
    return (
      <Container>
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Loading product details...</p>
        </div>
      </Container>
    );
  if (error)
    return (
      <Container>
        <div className="flex flex-col justify-center items-center h-64">
          <p className="text-lg text-red-500">Error loading product</p>
          <Link
            href="/products"
            className="mt-4 text-primary-600 hover:underline"
          >
            Return to products
          </Link>
        </div>
      </Container>
    );
  // Check specifically if the *product* itself wasn't found after loading
  if (!isLoading && !product)
    return (
      <Container>
        <div className="flex flex-col justify-center items-center h-64">
          <p className="text-lg">Product not found</p>
          <Link
            href="/products"
            className="mt-4 text-primary-600 hover:underline"
          >
            Return to products
          </Link>
        </div>
      </Container>
    );
  // Ensure product is available before rendering main content
  if (!product) return null; // Or a more specific loading/error state

  return (
    <>
      <PageHeader
        heading="Product Details"
        link1="products"
        link2={product.name}
      />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
          <div className="">
            {/* Add product image here */}
            <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Product Image</span>
            </div>
          </div>
          <div className="flex flex-col gap-4 ">
            <h1 className="text-2xl leading-tight text-wrap lg:text-3xl  font-bold mb-4 ">
              {product.name}
            </h1>
            <span
              className="flex gap-2 items-center 
          "
            >
              <Star fill="#d97706" className="text-primary-600" />
              <p className="font-normal text-xl">
                {product.reviews && product.reviews.length > 0
                  ? (
                      product.reviews.reduce(
                        (sum, review) => sum + review.rating,
                        0,
                      ) / product.reviews.length
                    ).toFixed(1)
                  : "0.0"}
              </p>
              <p className="font-normal text-xl">
                ({product.reviews?.length || 0} Reviews)
              </p>
            </span>

            {/* --- Price Display Logic --- */}
            <div className="inline-flex justify-between items-center w-full">
              {salesPriceAsNumber &&
              salesPriceAsNumber < originalPriceAsNumber ? (
                <div className="flex flex-wrap gap-4 md:gap-8 items-center w-full">
                  <CurrencyFormat
                    value={salesPriceAsNumber}
                    className="font-bold text-primary-600 text-left text-2xl "
                  />
                  <CurrencyFormat
                    value={originalPriceAsNumber}
                    className="line-through text-xl text-slate-500 "
                  />
                </div>
              ) : (
                <CurrencyFormat
                  value={priceAsNumber}
                  className="font-bold text-primary-600 text-left text-2xl "
                />
              )}
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700 font-normal">
                {product.description || "No description available"}
              </p>
            </div>

            <ProductVariants
              product={product}
              selectedVariants={selectedVariants}
              setSelectedVariants={setSelectedVariants}
            />
            <div className="capitalize underline cursor-pointer mb-8 text-lg">
              <p>View Size Guide</p>
            </div>

            {/* Display stock status */}
            {selectedVariantDetails && (
              <p
                className={`text-sm ${
                  isSelectedVariantOutOfStock
                    ? "text-red-600 font-semibold"
                    : "text-green-600"
                }`}
              >
                {isSelectedVariantOutOfStock
                  ? "Out of Stock"
                  : `${selectedQuantity} in Stock`}
              </p>
            )}

            <div className="w-full flex gap-4 items-center">
              <CustomButton
                name="Add to Cart"
                primaryColor="white"
                secondColor="#eab308"
                outlineColor="#eab308"
                disabled={isSelectedVariantOutOfStock}
              />
              <CustomButton
                name="Buy Now"
                primaryColor="#eab308"
                secondColor="white"
                outlineColor="#eab308"
                disabled={isSelectedVariantOutOfStock}
              />
              <div className="flex justify-center items-center w-[40px] h-[40px] border border-slate-300 rounded-full hover:bg-primary-600 transition-all ">
                <Heart className="text-primary-600 hover:text-white  " />
              </div>
            </div>
          </div>
        </div>
      </Container>
      <FeaturedProducts />
      <Payments />
    </>
  );
};

export default ProductPage;
