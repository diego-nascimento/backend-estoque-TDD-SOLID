/*
  Warnings:

  - You are about to drop the column `photoId` on the `categoria` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "categoria" DROP CONSTRAINT "categoria_photoId_fkey";

-- AlterTable
ALTER TABLE "categoria" DROP COLUMN "photoId";

-- CreateTable
CREATE TABLE "_categoriaTophoto" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_categoriaTophoto_AB_unique" ON "_categoriaTophoto"("A", "B");

-- CreateIndex
CREATE INDEX "_categoriaTophoto_B_index" ON "_categoriaTophoto"("B");

-- AddForeignKey
ALTER TABLE "_categoriaTophoto" ADD FOREIGN KEY ("A") REFERENCES "categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_categoriaTophoto" ADD FOREIGN KEY ("B") REFERENCES "photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
