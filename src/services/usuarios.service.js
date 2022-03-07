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
        },
        rejectOnNotFound: true,
      });
      return usuario;
    } catch (error) {
      if (error instanceof Prisma.Prisma.PrismaClientKnownRequestError) {
        return {
          message: "SERVICE Error al consultar usuario",
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
          email: true,
          tipoUsuario: true,
        },
      });
      return usuarios;
    } catch (error) {
      if (error instanceof Prisma.Prisma.PrismaClientKnownRequestError) {
        return {
          message: "SERVICE Error al crear usuarios",
          content: error.message,
        };
      }
    }
  }

  static async deleteUsuario(id) {
    try {
      const tareasSinResponsable = await prisma.tareas.findMany({
        where: { responsableId: id },
      });
      tareasSinResponsable.forEach((tarea) => {
        tarea.responsableId = tarea.supervisorId;
      });
      // const usuarioEliminado = await prisma.usuarios.delete({ where: { id } });
      // return usuarioEliminado;
      return "hola";
    } catch (error) {
      if (error instanceof Prisma.Prisma.PrismaClientKnownRequestError) {
        return {
          message: "SERVICE Error al eliminar el usuario",
          content: error.message,
        };
      }
    }
  }

  static async putUsuario(id, data) {
    try {
      const usuario = await prisma.usuarios.findUnique({ where: { id } });
      if (usuario === undefined) {
        return { message: `No existe el usuario que se busca actualizar` };
      }
      const password = hashSync(data.password, 10);
      const usuarioActualizado = await prisma.usuarios.update({
        where: { id },
        data: {
          nombre: data.nombre,
          apellido: data.apellido,
          email: data.email,
          password,
          tipoUsuario: data.tipoUsuario,
        },
      });
      return usuarioActualizado;
    } catch (error) {
      if (error instanceof Prisma.Prisma.PrismaClientKnownRequestError) {
        return {
          message: "SERVICE Error al actulizar el usuario",
          content: error.message,
        };
      }
    }
  }
}
