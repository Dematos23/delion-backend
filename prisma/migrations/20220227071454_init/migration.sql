-- CreateEnum
CREATE TYPE "tiposUsuarios" AS ENUM ('SUPERADMIN', 'ADMIN', 'SUPERVISOR', 'USUARIO');

-- CreateEnum
CREATE TYPE "estados" AS ENUM ('COMPLETO', 'EN_PROCESO', 'EN_REVISION', 'DETENIDO');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "tiposUsuariosId" INTEGER,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modulos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "modulos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modulos_usuarios" (
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "modulo_id" INTEGER NOT NULL,

    CONSTRAINT "modulos_usuarios_pkey" PRIMARY KEY ("usuario_id","modulo_id")
);

-- CreateTable
CREATE TABLE "TiposUsuarios" (
    "id" SERIAL NOT NULL,
    "tipoUsuario" "tiposUsuarios" NOT NULL,

    CONSTRAINT "TiposUsuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tareas" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tarea" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "estadosId" INTEGER,
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

-- CreateTable
CREATE TABLE "Estados" (
    "id" SERIAL NOT NULL,
    "estado" "estados" NOT NULL,

    CONSTRAINT "Estados_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_id_key" ON "usuarios"("id");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "modulos_id_key" ON "modulos"("id");

-- CreateIndex
CREATE UNIQUE INDEX "modulos_nombre_key" ON "modulos"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "TiposUsuarios_id_key" ON "TiposUsuarios"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TiposUsuarios_tipoUsuario_key" ON "TiposUsuarios"("tipoUsuario");

-- CreateIndex
CREATE UNIQUE INDEX "tareas_id_key" ON "tareas"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Archivos_id_key" ON "Archivos"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Archivos_url_key" ON "Archivos"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Estados_id_key" ON "Estados"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Estados_estado_key" ON "Estados"("estado");

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_tiposUsuariosId_fkey" FOREIGN KEY ("tiposUsuariosId") REFERENCES "TiposUsuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modulos_usuarios" ADD CONSTRAINT "modulos_usuarios_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modulos_usuarios" ADD CONSTRAINT "modulos_usuarios_modulo_id_fkey" FOREIGN KEY ("modulo_id") REFERENCES "modulos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tareas" ADD CONSTRAINT "tareas_creador_id_fkey" FOREIGN KEY ("creador_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tareas" ADD CONSTRAINT "tareas_responsable_id_fkey" FOREIGN KEY ("responsable_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tareas" ADD CONSTRAINT "tareas_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tareas" ADD CONSTRAINT "tareas_estadosId_fkey" FOREIGN KEY ("estadosId") REFERENCES "Estados"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Archivos" ADD CONSTRAINT "Archivos_tareasId_fkey" FOREIGN KEY ("tareasId") REFERENCES "tareas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
