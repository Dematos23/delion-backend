import Prisma from "@prisma/client";
import { prisma } from "../prisma.js";
import { hashSync } from "bcrypt";

export class UsuariosService {
  static async crearUsuario(data) {
    const password = hashSync(data.password, 10);
    try {
      const nuevoUsuario = await prisma.usuarios.create({
        data: {
          nombre: data.nombre,
          apellido: data.apellido,
          email: data.email,
          password,
          tipoUsuario: data.tipoUsuario,
          modulos: data.modulos,
        },
      });

      return {
        nuevoUsuario,
        message: "Usuario creado exitósamente",
      };
    } catch (error) {
      if (error instanceof Prisma.Prisma.PrismaClientKnownRequestError) {
        return {
          message: "Error al crear usuario",
          location: "SERVICE",
          content: error.message,
        };
      }
    }
  }

  static async getUsuario(id) {
    try {
      const usuario = await prisma.usuarios.findUnique({
        where: { id },
        select: {
          id: true,
          nombre: true,
          apellido: true,
          email: true,
          tipoUsuario: true,
          modulos: true,
        },
        rejectOnNotFound: true,
      });
      return usuario;
    } catch (error) {
      if (error instanceof Prisma.Prisma.PrismaClientKnownRequestError) {
        return {
          message: "Usuario no encontrado",
          location: "SERVICE",
          content: error.message,
        };
      }
    }
  }

  static async getUsuarios() {
    try {
      const usuarios = await prisma.usuarios.findMany({
        select: {
          id: true,
          nombre: true,
          apellido: true,
          tipoUsuario: true,
          modulos: true,
        },
      });
      return usuarios;
    } catch (error) {
      if (error instanceof Prisma.Prisma.PrismaClientKnownRequestError) {
        return {
          message: "Error al cargar usuarios",
          location: "SERVICE",
          content: error.message,
        };
      }
    }
  }

  static async deleteUsuario(id) {
    try {
      // const tareasSinResponsable = await prisma.tareas.findMany({
      //   where: { responsableId: id },
      // });
      // await Promise.all(
      //   tareasSinResponsable.map(async (tarea) => {
      //     const tareaActualizada = await prisma.tareas.updateMany({
      //       data: {
      //         responsableId: tarea.supervisorId,
      //         creadorId:
      //           tarea.creadorId === id ? tarea.supervisorId : tarea.creadorId,
      //       },
      //       where: {
      //         id: tarea.id,
      //       },
      //     });
      //     return tareaActualizada;
      //     // tarea.responsableId = tarea.supervisorId;
      //   })
      // );

      const usuarioEliminado = await prisma.usuarios.delete({ where: { id } });
      return {
        usuarioEliminado,
        message: "Usuarlio eliminado con éxito",
      };
    } catch (error) {
      if (error instanceof Prisma.Prisma.PrismaClientKnownRequestError) {
        return {
          message: "Error al eliminar el usuario",
          location: "SERVICE",
          content: error.message,
        };
      }
    }
  }

  static async putUsuario(id, data) {
    try {
      // const usuario = await prisma.usuarios.findUnique({ where: { id } });
      // if (usuario === undefined) {
      //   return { message: `No se encontró el usuario que se busca actualizar` };
      // }
      const password = hashSync(data.password, 10);
      const usuarioActualizado = await prisma.usuarios.update({
        where: { id },
        data: {
          nombre: data.nombre,
          apellido: data.apellido,
          email: data.email,
          password,
          tipoUsuario: data.tipoUsuario,
          modulos: data.modulos,
        },
      });
      return {
        usuarioActualizado,
        message: `El usuario ${usuarioActualizado.nombre} ${usuarioActualizado.apellido} fue actualizado correctamente`,
      };
    } catch (error) {
      if (error instanceof Prisma.Prisma.PrismaClientKnownRequestError) {
        return {
          message: "Error al actulizar el usuario",
          location: "SERVICE",
          content: error.message,
        };
      }
    }
  }
}
