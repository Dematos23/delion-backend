-- AlterTable
ALTER TABLE "marcas" ALTER COLUMN "nombre" DROP NOT NULL,
ALTER COLUMN "certificado" DROP NOT NULL,
ALTER COLUMN "fecha_vencimiento" DROP NOT NULL,
ALTER COLUMN "fecha_publicacion" DROP NOT NULL;
