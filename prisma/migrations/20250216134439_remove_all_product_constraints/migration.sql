-- Drop all potential unique constraints on Products
DROP INDEX IF EXISTS "Products_name_key";
DROP INDEX IF EXISTS "Products_name_idx";
DROP INDEX IF EXISTS "Products_slug_key";
DROP INDEX IF EXISTS "Products_sku_key";

-- Recreate non-unique indexes
CREATE INDEX "Products_name_idx" ON "Products"("name");
CREATE INDEX "Products_slug_idx" ON "Products"("slug");
CREATE INDEX "Products_sku_idx" ON "Products"("sku"); 