/*
  Warnings:

  - Added the required column `key` to the `photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preco` to the `produto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "photo" ADD COLUMN     "key" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "produto" ADD COLUMN     "preco" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "Stock" (
    "id" SERIAL NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "tipo" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Stock" ADD FOREIGN KEY ("produtoId") REFERENCES "produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
