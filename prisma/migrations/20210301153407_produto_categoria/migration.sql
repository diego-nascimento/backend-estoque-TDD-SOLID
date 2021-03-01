/*
  Warnings:

  - You are about to drop the column `produtoId` on the `photo` table. All the data in the column will be lost.
  - You are about to drop the `_categoriaTophoto` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoriaId` to the `produto` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_categoriaTophoto" DROP CONSTRAINT "_categoriaTophoto_A_fkey";

-- DropForeignKey
ALTER TABLE "_categoriaTophoto" DROP CONSTRAINT "_categoriaTophoto_B_fkey";

-- DropForeignKey
ALTER TABLE "photo" DROP CONSTRAINT "photo_produtoId_fkey";

-- AlterTable
ALTER TABLE "categoria" ADD COLUMN     "photoId" INTEGER;

-- AlterTable
ALTER TABLE "photo" DROP COLUMN "produtoId";

-- AlterTable
ALTER TABLE "produto" ADD COLUMN     "categoriaId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "_photoToproduto" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- DropTable
DROP TABLE "_categoriaTophoto";

-- CreateIndex
CREATE UNIQUE INDEX "_photoToproduto_AB_unique" ON "_photoToproduto"("A", "B");

-- CreateIndex
CREATE INDEX "_photoToproduto_B_index" ON "_photoToproduto"("B");

-- AddForeignKey
ALTER TABLE "_photoToproduto" ADD FOREIGN KEY ("A") REFERENCES "photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_photoToproduto" ADD FOREIGN KEY ("B") REFERENCES "produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categoria" ADD FOREIGN KEY ("photoId") REFERENCES "photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produto" ADD FOREIGN KEY ("categoriaId") REFERENCES "categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;
