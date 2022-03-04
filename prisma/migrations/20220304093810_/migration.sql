-- CreateEnum
CREATE TYPE "tiposUsuario" AS ENUM ('SUPERADMIN', 'ADMIN', 'SUPERVISOR', 'USUARIO');

-- CreateEnum
CREATE TYPE "estados" AS ENUM ('COMPLETO', 'EN_PROCESO', 'EN_REVISION');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "tipoUsuario" "tiposUsuario" NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tareas" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tarea" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "estado" "estados" NOT NULL,
    "creador_id" INTEGER NOT NULL,
    "responsable_id" INTEGER NOT NULL,
    "supervisor_id" INTEGER NOT NULL,
    "expediente_id" INTEGER,

    CONSTRAINT "tareas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Archivos" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT NOT NULL,
    "tareasId" INTEGER,

    CONSTRAINT "Archivos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_id_key" ON "usuarios"("id");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tareas_id_key" ON "tareas"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Archivos_id_key" ON "Archivos"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Archivos_url_key" ON "Archivos"("url");

-- AddForeignKey
ALTER TABLE "tareas" ADD CONSTRAINT "tareas_creador_id_fkey" FOREIGN KEY ("creador_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tareas" ADD CONSTRAINT "tareas_responsable_id_fkey" FOREIGN KEY ("responsable_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tareas" ADD CONSTRAINT "tareas_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Archivos" ADD CONSTRAINT "Archivos_tareasId_fkey" FOREIGN KEY ("tareasId") REFERENCES "tareas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
