-- DropIndex
DROP INDEX IF EXISTS "Products_name_key";
DROP INDEX IF EXISTS "Products_name_idx";

-- CreateIndex
CREATE INDEX "Products_name_idx" ON "Products"("name"); 