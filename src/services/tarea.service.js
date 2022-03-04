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

  static async getTareas(data) {
    try {
      let tareas;
      const sort = data.sort;
      const responsableId = data.responsableId;
      const estado = data.estado;
      console.log(data);
      if (data.orderBy == "tarea") {
        console.log("estoy en el else if tarea");
        tareas = await prisma.tareas.findMany({
          where: { responsableId, estado },
          select: {
            id: true,
            tarea: true,
            deadline: true,
            estado: true,
            archivos: true,
            responsable: { select: { id: true, nombre: true, apellido: true } },
            supervisor: { select: { id: true, nombre: true, apellido: true } },
          },
          orderBy: { tarea: sort },
        });
      } else if (data.orderBy == "deadline") {
        console.log("estoy en el else if deadline");
        tareas = await prisma.tareas.findMany({
          where: { responsableId, estado },
          select: {
            id: true,
            tarea: true,
            deadline: true,
            estado: true,
            archivos: true,
            responsable: { select: { id: true, nombre: true, apellido: true } },
            supervisor: { select: { id: true, nombre: true, apellido: true } },
          },
          orderBy: { deadline: sort },
        });
      } else if (data.orderBy == "estado") {
        console.log("estoy en el else if estado");
        tareas = await prisma.tareas.findMany({
          where: { responsableId, estado },
          select: {
            id: true,
            tarea: true,
            deadline: true,
            estado: true,
            archivos: true,
            responsable: { select: { id: true, nombre: true, apellido: true } },
            supervisor: { select: { id: true, nombre: true, apellido: true } },
          },
          orderBy: { estado: sort },
        });
      } else if (data.orderBy == "responsable") {
        console.log("estoy en el else if responsable");
        tareas = await prisma.tareas.findMany({
          where: { responsableId, estado },
          select: {
            id: true,
            tarea: true,
            deadline: true,
            estado: true,
            archivos: true,
            responsable: { select: { id: true, nombre: true, apellido: true } },
            supervisor: { select: { id: true, nombre: true, apellido: true } },
          },
          orderBy: { responsable: { nombre: sort } },
        });
      } else if (data.orderBy == "supervisor") {
        console.log("estoy en el else if supervisor");
        tareas = await prisma.tareas.findMany({
          where: { responsableId, estado },
          select: {
            id: true,
            tarea: true,
            deadline: true,
            estado: true,
            archivos: true,
            responsable: { select: { id: true, nombre: true, apellido: true } },
            supervisor: { select: { id: true, nombre: true, apellido: true } },
          },
          orderBy: { supervisor: { nombre: sort } },
        });
      } else {
        console.log("estoy en el else");
        tareas = await prisma.tareas.findMany({
          where: { OR: [{ estado: "EN_PROCESO" }, { estado: "EN_REVISION" }] },
          select: {
            id: true,
            tarea: true,
            deadline: true,
            estado: true,
            archivos: true,
            responsable: { select: { id: true, nombre: true, apellido: true } },
            supervisor: { select: { id: true, nombre: true, apellido: true } },
          },
          orderBy: { deadline: "asc" },
        });
      }
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
      include: { archivos: { select: { id: true, url: true } } },
      rejectOnNotFound: false,
    });
    if (!tarea) {
      return { message: `No existe la tarea con el id ${id}` };
    }
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
