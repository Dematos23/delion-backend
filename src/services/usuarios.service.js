import Prisma from "@prisma/client";
import { prisma } from "../prisma.js";
import { hashSync } from "bcrypt";

export class UsuariosService {
  static async crearUsuario(data) {
    const password = hashSync(data.password, 10);
    console.log(data);
    try {
      const nuevoUsuario = await prisma.usuarios.create({
        data: {
          nombre: data.nombre,
          apellido: data.apellido,
          email: data.email,
          password,
          tipoUsuario: data.tipoUsuario,
          equiposId: data.equipoId,
        },
      });

      return nuevoUsuario;
    } catch (error) {
      if (error instanceof Prisma.Prisma.PrismaClientKnownRequestError) {
        return {
          message: "SERVICE Error al crear usuario",
          content: error.message,
        };
      }
    }
  }
}
