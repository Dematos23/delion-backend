/*
  Warnings:

  - Added the required column `marcaId` to the `Expedientes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "modulos" AS ENUM ('CASOS', 'MARCAS');

-- AlterTable
ALTER TABLE "Expedientes" ADD COLUMN     "marcaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "modulos" "modulos"[];

-- DropEnum
DROP TYPE "marcaEstado";

-- AddForeignKey
ALTER TABLE "Expedientes" ADD CONSTRAINT "Expedientes_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "marcas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
