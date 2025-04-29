import {
  ProductAttribute,
  ProductVariant,
  ProductReview as PrismaProductReview,
  ProductTag,
  ProductImage,
  ProductVariantValue,
  ProductItem as PrismaProductItem,
  Prisma,
  Brand,
  User,
  ProductReviewImage,
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

export type ProductItemVariantValue = {
  id: number;
  value: string;
  variantId: number;
  variant: {
    name: string;
  };
};

export type ProductItem = {
  id: number;
  sku: string;
  price: Prisma.Decimal;
  quantity: number;
  variantValues: ProductItemVariantValue[];
};

export type ProductVariantWithValues = ProductVariant & {
  values?: (ProductVariantValue & { hexCode?: string | null })[];
};

export type Product = {
  id: number;
  name: string;
  link: string;
  slug: string;
  description: string;
  fullDescription?: string;
  price: Prisma.Decimal;
  salesPrice: Prisma.Decimal | null;
  sku: string | null;
  status: string;
  subcategoryId: number;
  subcategory: SubCategory;
  categoryId: number;
  category: Category;
  brandId: number;
  brand: Brand;
  isAvailable: boolean;
  featured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  relatedProducts?: RelatedProduct[];
  wishlist?: ProductWishlist[];
  discounts?: Discount[];
  images: ProductImage[];
  variants?: ProductVariantWithValues[];
  reviews?: ProductReview[];
  tags?: ProductTag[];
  attributes?: ProductAttribute[];
  productItems?: ProductItem[];
  user?: User;
  materialType?: string;
};

export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant: ProductVariant[];
};

export type Slides = {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  order: number;
  slug: string;
  btn: string;
  textColor: string;
  subTitle: string;
};

export type ProductReview = PrismaProductReview & {
  user: {
    firstName: string;
    lastName: string;
    emailVerified: boolean;
    photo: string;
    images: ProductReviewImage[];
  };
};
