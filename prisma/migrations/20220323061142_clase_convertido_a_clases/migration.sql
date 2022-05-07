/*
  Warnings:

  - You are about to drop the column `clase` on the `marcas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "marcas" DROP COLUMN "clase",
ADD COLUMN     "clases" INTEGER[];
