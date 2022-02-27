import Prisma from "@prisma/client";
import { prisma } from "../prisma.js";
import { hashSync } from "bcrypt";

export class UsuariosService {
  static async crearUsuario(data) {
    // const password = hashSync(data.password, 10);
    // const usuarioAsignador = prisma.usuarios.findUnique({
    //   where: { id: data.usuarioasignador },
    // });
    try {
      const nuevaTarea = await prisma.tareas.create({
        data: {
          tarea: data.tarea,
          categoria: data.categoria,
          estado: data.estado,
          deadline: data.deadline,
          creadorId: data.creadorId,
          responsableId: data.responsableId,
          supervisorId: data.supervisorId,
        },
      });
      const nuevoUsuario = await prisma.usuarios.create({
        data: {
          nombre: data.nombre,
          apellido: data.apellido,
          email: data.email,
          password,
          tipoUsuario: data.tipoUsuario,
        },
      });
      console.log("nuevoUsuario");
      return { cotent: nuevaTarea };
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
