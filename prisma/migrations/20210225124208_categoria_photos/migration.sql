/*
  Warnings:

  - You are about to drop the column `description` on the `categoria` table. All the data in the column will be lost.
  - You are about to drop the column `resume` on the `categoria` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "categoria" DROP COLUMN "description",
DROP COLUMN "resume";
