/*
  Warnings:

  - You are about to drop the `Archivos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Equipos` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "marcaEstado" AS ENUM ('OTORGADO', 'DENAGADO', 'EN_PROCESO');

-- CreateEnum
CREATE TYPE "tipoMarca" AS ENUM ('NOMINATIVA', 'FIGURATIVA', 'MIXTA');

-- DropForeignKey
ALTER TABLE "Archivos" DROP CONSTRAINT "Archivos_tareas_id_fkey";

-- DropForeignKey
ALTER TABLE "usuarios" DROP CONSTRAINT "usuarios_equipos_id_fkey";

-- DropTable
DROP TABLE "Archivos";

-- DropTable
DROP TABLE "Equipos";

-- CreateTable
CREATE TABLE "archivos_tareas" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT NOT NULL,
    "tareas_id" INTEGER,
    "nombre" TEXT NOT NULL DEFAULT E'archivo',

    CONSTRAINT "archivos_tareas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Casos" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Casos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expedientes" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expediente" TEXT NOT NULL,
    "expediente_ano" INTEGER NOT NULL,
    "fecha_presentacion" TIMESTAMP(3) NOT NULL,
    "resolucion" TEXT NOT NULL,
    "resolucion_ano" INTEGER NOT NULL,
    "fecha_resolucion" TIMESTAMP(3) NOT NULL,
    "marcasId" INTEGER,
    "casosId" INTEGER,

    CONSTRAINT "Expedientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "marcas" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nombre" TEXT NOT NULL,
    "clase" INTEGER[],
    "tipo" "tipoMarca" NOT NULL,
    "productos" TEXT NOT NULL,
    "certificado" INTEGER NOT NULL,
    "fecha_vencimiento" TIMESTAMP(3) NOT NULL,
    "fecha_publicacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "marcas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "archivos_marcas" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT NOT NULL,
    "nombre" TEXT NOT NULL DEFAULT E'archivo',
    "marca_id" INTEGER NOT NULL,

    CONSTRAINT "archivos_marcas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "archivos_tareas_id_key" ON "archivos_tareas"("id");

-- CreateIndex
CREATE UNIQUE INDEX "archivos_tareas_url_key" ON "archivos_tareas"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Casos_id_key" ON "Casos"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Expedientes_id_key" ON "Expedientes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Expedientes_expediente_key" ON "Expedientes"("expediente");

-- CreateIndex
CREATE UNIQUE INDEX "Expedientes_resolucion_key" ON "Expedientes"("resolucion");

-- CreateIndex
CREATE UNIQUE INDEX "marcas_id_key" ON "marcas"("id");

-- CreateIndex
CREATE UNIQUE INDEX "marcas_certificado_key" ON "marcas"("certificado");

-- CreateIndex
CREATE UNIQUE INDEX "archivos_marcas_id_key" ON "archivos_marcas"("id");

-- CreateIndex
CREATE UNIQUE INDEX "archivos_marcas_url_key" ON "archivos_marcas"("url");

-- CreateIndex
CREATE UNIQUE INDEX "archivos_marcas_marca_id_key" ON "archivos_marcas"("marca_id");

-- AddForeignKey
ALTER TABLE "archivos_tareas" ADD CONSTRAINT "archivos_tareas_tareas_id_fkey" FOREIGN KEY ("tareas_id") REFERENCES "tareas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expedientes" ADD CONSTRAINT "Expedientes_casosId_fkey" FOREIGN KEY ("casosId") REFERENCES "Casos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expedientes" ADD CONSTRAINT "Expedientes_marcasId_fkey" FOREIGN KEY ("marcasId") REFERENCES "marcas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "archivos_marcas" ADD CONSTRAINT "archivos_marcas_marca_id_fkey" FOREIGN KEY ("marca_id") REFERENCES "marcas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
