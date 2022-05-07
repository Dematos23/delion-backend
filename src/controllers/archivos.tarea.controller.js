import { ArchivosTareaService } from "../services/archivos.tarea.service.js";
import { archivosTareaDto } from "../services/dtos/request/archivos.tarea.dto.js";
import { prisma } from "../prisma.js";

export class ArchivosTareaController {
  static async crearArchivo(req, res) {
    try {
      const data = archivosTareaDto(req.body);
      const url = await ArchivosTareaService.crearArchivo(data);
      return res.status(201).json({ url });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  static async eliminarArchivo(req, res) {
    try {
      const archivosParaEliminar = await prisma.archivos.findMany({
        where: { tareasId: +req.body.id },
      });
      archivosParaEliminar.forEach(async (archivo) => {
        if (archivo.nombre === req.body.nombre) {
          console.log(archivo);
          ArchivosTareaService.deleteArchivo(archivo.url);
          await prisma.archivos.delete({
            where: { url: archivo.url },
          });
        }
      });
      return res.status(201);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}
