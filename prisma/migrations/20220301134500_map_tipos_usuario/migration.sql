/*
  Warnings:

  - You are about to drop the column `tiposUsuariosId` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the `TiposUsuarios` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tipo_usuario` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "tiposUsuario" AS ENUM ('SUPERADMIN', 'ADMIN', 'SUPERVISOR', 'USUARIO');

-- DropForeignKey
ALTER TABLE "usuarios" DROP CONSTRAINT "usuarios_tiposUsuariosId_fkey";

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "tiposUsuariosId",
ADD COLUMN     "tipo_usuario" INTEGER NOT NULL;

-- DropTable
DROP TABLE "TiposUsuarios";

-- DropEnum
DROP TYPE "tiposUsuarios";

-- CreateTable
CREATE TABLE "tipos_usuario" (
    "id" SERIAL NOT NULL,
    "tipo_usuario" "tiposUsuario" NOT NULL,

    CONSTRAINT "tipos_usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tipos_usuario_id_key" ON "tipos_usuario"("id");

-- CreateIndex
CREATE UNIQUE INDEX "tipos_usuario_tipo_usuario_key" ON "tipos_usuario"("tipo_usuario");

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_tipo_usuario_fkey" FOREIGN KEY ("tipo_usuario") REFERENCES "tipos_usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
