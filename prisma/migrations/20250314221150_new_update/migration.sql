-- AlterTable
ALTER TABLE "ProductVariant" ADD COLUMN     "salesPrice" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "salesPrice" DECIMAL(65,30);
