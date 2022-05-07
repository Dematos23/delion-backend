import Prisma from "@prisma/client";
import { prisma } from "../prisma.js";

export class MarcasService {
  static async postMarca(data) {
    try {
      if (data.certificado) {
        const certificadoEncontrado = await prisma.marcas.findUnique({
          where: { certificado },
        });
        if (certificadoEncontrado == data.certificado) {
          throw Error("SERVICE: ya existe el certificado en la base de datos");
        }
      }
      const nuevaMarca = await prisma.marcas.create({ data });
      return nuevaMarca;
    } catch (error) {
      if (error instanceof Prisma.Prisma.PrismaClientKnownRequestError) {
        return {
          message: "SERVICE Error al crear la tarea",
          content: error.message,
        };
      }
    }
  }

  static async postMarcas(data) {
    try {
      const nuevasMarcas = await prisma.marcas.createMany({
        data,
        skipDuplicates: true,
      });
      return nuevasMarcas;
    } catch (error) {
      if (error instanceof Prisma.Prisma.PrismaClientKnownRequestError) {
        return {
          message: "SERVICE Error al crear la tarea",
          content: error.message,
        };
      }
    }
  }

  static async getMarcas(data) {
    try {
      const marcas = prisma.marcas.findMany();
      return marcas;
    } catch (error) {
      if (error instanceof Prisma.Prisma.PrismaClientKnownRequestError) {
        return {
          message: "SERVICE Error al crear la tarea",
          content: error.message,
        };
      }
    }
  }

  static async deleteMarcas(id) {
    const marcaEliminada = await prisma.marcas.findUnique({ where: { id } });
    await prisma.marcas.delete({ where: { id } });
    return marcaEliminada;
  }
}
