/*
  Warnings:

  - You are about to drop the column `marcasId` on the `Expedientes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Expedientes" DROP CONSTRAINT "Expedientes_marcasId_fkey";

-- AlterTable
ALTER TABLE "Expedientes" DROP COLUMN "marcasId";
