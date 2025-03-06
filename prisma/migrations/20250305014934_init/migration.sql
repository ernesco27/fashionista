/*
  Warnings:

  - Added the required column `btn` to the `Slide` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Slide` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Slide` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Slide` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Slide" ADD COLUMN     "btn" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "subTitle" TEXT,
ADD COLUMN     "textColor" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "order" DROP NOT NULL;
