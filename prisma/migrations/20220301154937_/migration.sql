/*
  Warnings:

  - You are about to drop the column `tipo_usuario` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the `tipos_usuario` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tipoUsuario` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "usuarios" DROP CONSTRAINT "usuarios_tipo_usuario_fkey";

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "tipo_usuario",
ADD COLUMN     "tipoUsuario" "tiposUsuario" NOT NULL;

-- DropTable
DROP TABLE "tipos_usuario";
