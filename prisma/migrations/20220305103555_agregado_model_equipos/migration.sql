/*
  Warnings:

  - You are about to drop the column `tareasId` on the `Archivos` table. All the data in the column will be lost.
  - You are about to drop the column `tipoUsuario` on the `usuarios` table. All the data in the column will be lost.
  - Added the required column `tipo_usuario` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Archivos" DROP CONSTRAINT "Archivos_tareasId_fkey";

-- AlterTable
ALTER TABLE "Archivos" DROP COLUMN "tareasId",
ADD COLUMN     "tareas_id" INTEGER;

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "tipoUsuario",
ADD COLUMN     "equiposId" INTEGER,
ADD COLUMN     "tipo_usuario" "tiposUsuario" NOT NULL;

-- CreateTable
CREATE TABLE "Equipos" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Equipos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Equipos_id_key" ON "Equipos"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Equipos_nombre_key" ON "Equipos"("nombre");

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_equiposId_fkey" FOREIGN KEY ("equiposId") REFERENCES "Equipos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Archivos" ADD CONSTRAINT "Archivos_tareas_id_fkey" FOREIGN KEY ("tareas_id") REFERENCES "tareas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
