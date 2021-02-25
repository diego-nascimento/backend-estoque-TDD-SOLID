-- AlterTable
ALTER TABLE "categoria" ADD COLUMN     "photoId" INTEGER;

-- CreateTable
CREATE TABLE "photo" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "categoria" ADD FOREIGN KEY ("photoId") REFERENCES "photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
