/*
  Warnings:

  - You are about to drop the column `createdAt` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `ProductVariant` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - Made the column `price` on table `ProductVariant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sku` on table `ProductVariant` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "ProductVariant_sku_key";

-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "createdAt",
DROP COLUMN "description",
DROP COLUMN "link",
DROP COLUMN "slug",
ADD COLUMN     "values" TEXT[],
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "stock" DROP DEFAULT,
ALTER COLUMN "sku" SET NOT NULL;
