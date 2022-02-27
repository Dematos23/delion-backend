import { ArchivosTareaService } from "../services/archivos.tarea.service.js";
import { archivosTareaDto } from "../services/dtos/request/archivos.tarea.dto.js";

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
}
