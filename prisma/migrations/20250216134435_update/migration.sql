/*
  Warnings:

  - You are about to drop the column `link` on the `ProductReview` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `ProductReview` table. All the data in the column will be lost.
  - Added the required column `link` to the `ProductVariant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `ProductVariant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductReview" DROP COLUMN "link",
DROP COLUMN "slug";

-- AlterTable
ALTER TABLE "ProductVariant" ADD COLUMN     "link" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;
