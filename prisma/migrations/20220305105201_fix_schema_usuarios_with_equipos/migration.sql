/*
  Warnings:

  - You are about to drop the column `equiposId` on the `usuarios` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "usuarios" DROP CONSTRAINT "usuarios_equiposId_fkey";

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "equiposId",
ADD COLUMN     "equipos_id" INTEGER;

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_equipos_id_fkey" FOREIGN KEY ("equipos_id") REFERENCES "Equipos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
