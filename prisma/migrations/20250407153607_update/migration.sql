-- DropForeignKey
ALTER TABLE "ProductVariantValue" DROP CONSTRAINT "ProductVariantValue_variantId_fkey";

-- AlterTable
CREATE SEQUENCE productvariantvalue_id_seq;
ALTER TABLE "ProductVariantValue" ALTER COLUMN "id" SET DEFAULT nextval('productvariantvalue_id_seq'),
ADD CONSTRAINT "ProductVariantValue_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE productvariantvalue_id_seq OWNED BY "ProductVariantValue"."id";

-- DropIndex
DROP INDEX "ProductVariantValue_id_key";

-- CreateIndex
CREATE INDEX "ProductVariantValue_value_idx" ON "ProductVariantValue"("value");

-- AddForeignKey
ALTER TABLE "ProductVariantValue" ADD CONSTRAINT "ProductVariantValue_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
