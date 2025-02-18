-- CreateTable
CREATE TABLE "Subpage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pageId" INTEGER NOT NULL,

    CONSTRAINT "Subpage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subpage" ADD CONSTRAINT "Subpage_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Pages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
