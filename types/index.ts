import {
  ProductAttribute,
  ProductVariant,
  ProductReview,
  ProductTag,
  ProductImage,
} from "@prisma/client";

export type SubCategory = {
  id: number;
  name: string;
  link: string;
  slug: string;
  categoryId: number;
};

export type Category = {
  id: number;
  name: string;
  link: string;
  slug: string;
  image?: string;
  createdAt?: Date;
  subcategory: SubCategory[];
};

export type Subpage = {
  id: number;
  name: string;
  link: string;
  slug: string;
  pageId: number;
};

export type Page = {
  id: number;
  name: string;
  link: string;
  slug: string;
  subpage: Subpage[];
};

export type RelatedProduct = {
  id: number;
  link: string;
  slug: string;
  productId: number;
  product: Product;
};

export type ProductWishlist = {
  id: number;
  createdAt: Date;
  productId: number;
  product: Product;
  userId: string;
};

export type Discount = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description?: string;
  type: string;
  value: number;
  startDate: Date;
  endDate: Date;
  products?: Product[];
  isActive: boolean;
};

export type Product = {
  id: number;
  name: string;
  link: string;
  slug: string;
  description: string;
  price: number;
  sku: string;
  status: string;
  subcategoryId: number;
  categoryId: number;
  brandId: number;
  isAvailable: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  relatedProducts?: RelatedProduct[];
  wishlist?: ProductWishlist[];
  discounts?: Discount[];
  images: ProductImage[];
  variants?: ProductVariant[];
  reviews?: ProductReview[];
  tags?: ProductTag[];
  attributes?: ProductAttribute[];
};
