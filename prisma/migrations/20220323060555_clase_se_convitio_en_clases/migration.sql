/*
  Warnings:

  - You are about to drop the column `tipo` on the `marcas` table. All the data in the column will be lost.
  - Added the required column `descripcion_logo` to the `marcas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo_marca` to the `marcas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "marcas" DROP COLUMN "tipo",
ADD COLUMN     "descripcion_logo" TEXT NOT NULL,
ADD COLUMN     "tipo_marca" "tipoMarca" NOT NULL;
