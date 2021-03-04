/*
  Warnings:

  - You are about to drop the `Stock` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_produtoId_fkey";

-- CreateTable
CREATE TABLE "Estoque" (
    "id" SERIAL NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "tipo" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- DropTable
DROP TABLE "Stock";

-- AddForeignKey
ALTER TABLE "Estoque" ADD FOREIGN KEY ("produtoId") REFERENCES "produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
