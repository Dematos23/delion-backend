/*
  Warnings:

  - You are about to drop the column `estadosId` on the `tareas` table. All the data in the column will be lost.
  - You are about to drop the `Estados` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `estado` to the `tareas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tareas" DROP CONSTRAINT "tareas_estadosId_fkey";

-- AlterTable
ALTER TABLE "tareas" DROP COLUMN "estadosId",
ADD COLUMN     "estado" "estados" NOT NULL;

-- DropTable
DROP TABLE "Estados";
