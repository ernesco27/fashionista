/*
  Warnings:

  - You are about to drop the column `variantId` on the `ProductAttributeValue` table. All the data in the column will be lost.
  - You are about to drop the column `isAvailable` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `salesPrice` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `sku` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `ProductVariant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[variantId,value]` on the table `ProductVariantValue` will be added. If there are existing duplicate values, this will fail.
  - Made the column `price` on table `Products` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductAttributeValue" DROP CONSTRAINT "ProductAttributeValue_variantId_fkey";

-- DropForeignKey
ALTER TABLE "ProductVariantValue" DROP CONSTRAINT "ProductVariantValue_variantId_fkey";

-- DropIndex
DROP INDEX "ProductVariant_price_idx";

-- AlterTable
CREATE SEQUENCE productattributevalue_id_seq;
ALTER TABLE "ProductAttributeValue" DROP COLUMN "variantId",
ALTER COLUMN "id" SET DEFAULT nextval('productattributevalue_id_seq'),
ADD CONSTRAINT "ProductAttributeValue_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE productattributevalue_id_seq OWNED BY "ProductAttributeValue"."id";

-- DropIndex
DROP INDEX "ProductAttributeValue_id_key";

-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "isAvailable",
DROP COLUMN "price",
DROP COLUMN "salesPrice",
DROP COLUMN "sku",
DROP COLUMN "status",
DROP COLUMN "stock";

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "fullDescription" TEXT,
ADD COLUMN     "materialType" TEXT,
ALTER COLUMN "price" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "photo" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "ProductReviewImage" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewId" INTEGER NOT NULL,

    CONSTRAINT "ProductReviewImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductItem" (
    "id" SERIAL NOT NULL,
    "sku" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "ProductItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductItemToProductVariantValue" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ProductItemToProductVariantValue_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductItem_sku_key" ON "ProductItem"("sku");

-- CreateIndex
CREATE INDEX "ProductItem_sku_idx" ON "ProductItem"("sku");

-- CreateIndex
CREATE INDEX "_ProductItemToProductVariantValue_B_index" ON "_ProductItemToProductVariantValue"("B");

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariantValue_variantId_value_key" ON "ProductVariantValue"("variantId", "value");

-- AddForeignKey
ALTER TABLE "ProductReviewImage" ADD CONSTRAINT "ProductReviewImage_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "ProductReview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariantValue" ADD CONSTRAINT "ProductVariantValue_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductItem" ADD CONSTRAINT "ProductItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductItemToProductVariantValue" ADD CONSTRAINT "_ProductItemToProductVariantValue_A_fkey" FOREIGN KEY ("A") REFERENCES "ProductItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductItemToProductVariantValue" ADD CONSTRAINT "_ProductItemToProductVariantValue_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductVariantValue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
