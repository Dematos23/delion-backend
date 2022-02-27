import Prisma from "@prisma/client";
import { prisma } from "../prisma.js";
import { ArchivosTareaService } from "./archivos.tarea.service.js";

export class TareaService {
  static async crearTarea(data) {
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
      return { cotent: nuevaTarea };
    } catch (error) {
      if (error instanceof Prisma.Prisma.PrismaClientKnownRequestError) {
        return {
          message: "SERVICE Error al crear la tarea",
          content: error.message,
        };
      }
    }
  }

  static async getTareas() {
    try {
      const tareas = await prisma.tareas.findMany();
      tareas.forEach(async (tarea) => {
        const archivos = await prisma.archivos.findMany({
          where: { tareasId: tarea.id },
        });
        const urls = [];
        archivos.forEach(async (archivo) => {
          const url = ArchivosTareaService.devolverURL(archivo.url);
          urls.push(url);
        });
        tarea.urls = urls;
        console.log(tareas);
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
      rejectOnNotFound: false,
    });
    if (!tarea) {
      return { message: `No existe la tarea con el id ${id}` };
    }
    const archivosEncontrados = await prisma.archivos.findMany({
      where: { tareasId: id },
    });

    const urlsDevueltas = [];
    archivosEncontrados.forEach((archivo) => {
      const key = archivo.url;
      const url = ArchivosTareaService.devolverURL(key);
      urlsDevueltas.push(url);
    });
    tarea.urls = urlsDevueltas;
    return tarea;
  }

  static async putTarea(id, data) {
    const nuevaData = data;
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
