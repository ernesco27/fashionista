/*
  Warnings:

  - You are about to drop the column `values` on the `ProductVariant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "values";

-- CreateTable
CREATE TABLE "ProductVariantValue" (
    "id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "variantId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariantValue_id_key" ON "ProductVariantValue"("id");

-- AddForeignKey
ALTER TABLE "ProductVariantValue" ADD CONSTRAINT "ProductVariantValue_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
