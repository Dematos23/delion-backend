import Prisma from "@prisma/client";
import { prisma } from "../prisma.js";
import { ArchivosTareaService } from "./archivos.tarea.service.js";

export class TareaService {
  static async crearTarea(data) {
    try {
      const nuevaTarea = await prisma.tareas.create({ data });
      console.log(data);
      return nuevaTarea;
    } catch (error) {
      if (error instanceof Prisma.Prisma.PrismaClientKnownRequestError) {
        return {
          message: "SERVICE Error al crear la tarea",
          content: error.message,
        };
      }
    }
  }

  static async getTareas(data) {
    try {
      const responsableId = data.responsableId;
      const supervisorId = data.supervisorId;
      const estado = data.estado;

      let where;
      if (estado == undefined) {
        where = { estado: undefined, responsableId, supervisorId };
      } else if (estado.length == 1) {
        where = { estado: estado[0], responsableId, supervisorId };
      } else if (estado.length > 1) {
        let whereOr = [];
        for (let index = 0; index < estado.length; index++) {
          let item = { estado: estado[index] };
          whereOr.push(item);
        }
        where = { OR: whereOr, responsableId, supervisorId };
      }

      const tareas = await prisma.tareas.findMany({
        where: where,
        select: {
          id: true,
          tarea: true,
          deadline: true,
          estado: true,
          archivos: { select: { url: true } },
          responsable: { select: { id: true, nombre: true, apellido: true } },
          supervisor: { select: { id: true, nombre: true, apellido: true } },
        },
        orderBy: { [data.orderBy]: data.sort },
      });

      tareas.forEach((tarea) => {
        tarea.archivos.forEach((archivo) => {
          const nuevaUrl = ArchivosTareaService.devolverURL(archivo.url);
          archivo.url = nuevaUrl;
        });
      });

      return tareas;
    } catch (error) {
      if (error instanceof Prisma.Prisma.PrismaClientKnownRequestError) {
        return {
          message: "SERVICE Error al consultar las tareas",
          content: error.message,
        };
      }
    }
  }

  static async getTarea(id) {
    const tarea = await prisma.tareas.findUnique({
      where: { id },
      include: { archivos: { select: { url: true } } },
      rejectOnNotFound: false,
    });
    if (!tarea) {
      return { message: `No existe la tarea con el id ${id}` };
    }
    tarea.archivos.forEach((archivo) => {
      const nuevaUrl = ArchivosTareaService.devolverURL(archivo.url);
      archivo.url = nuevaUrl;
    });

    return tarea;
  }

  static async putTarea(id, data) {
    const tarea = await prisma.tareas.findUnique({ where: { id } });
    if (tarea === undefined) {
      return { message: `No existe la tarea con el id ${id}` };
    }
    const tareaActualizada = await prisma.tareas.update({
      where: { id },
      data: data,
    });
    return tareaActualizada;
  }

  static async deleteTarea(id) {
    const tareaEliminada = await prisma.tareas.findUnique({ where: { id } });
    const archivosParaEliminar = await prisma.archivos.findMany({
      where: { tareasId: id },
    });
    if (tareaEliminada && archivosParaEliminar.length !== 0) {
      archivosParaEliminar.forEach((archivo) => {
        ArchivosTareaService.deleteArchivo(archivo.url);
      });
      await prisma.archivos.deleteMany({ where: { tareasId: id } });
      await prisma.tareas.delete({ where: { id } });
    } else if (tareaEliminada) {
      await prisma.tareas.delete({ where: { id } });
    }

    return tareaEliminada;
  }
}
