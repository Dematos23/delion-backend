import { tareaDto } from "../services/dtos/request/tarea.dto.js";
import { TareaService } from "../services/tarea.service.js";

export class TareaController {
  static async crearTarea(req, res) {
    try {
      const { tarea, categoria, responsableId, deadline } = tareaDto(req.body);
      const { estado, creadorId, supervisorId } = req.body;
      const resultado = await TareaService.crearTarea({
        tarea,
        categoria,
        estado,
        deadline: new Date(deadline),
        creadorId,
        responsableId,
        supervisorId,
      });
      return res.status(201).json(resultado);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: "CONTROLLER Error al crear la tarea",
        content: error.message,
      });
    }
  }

  static async getTareas(req, res) {
    try {
      const resultado = await TareaService.getTareas(req.body);
      return res.status(201).json(resultado);
    } catch (error) {
      return res.status(400).json({
        message: "CONTROLLER Error al consultar las tareas",
        content: error.message,
      });
    }
  }

  static async getTarea(req, res) {
    try {
      const resultado = await TareaService.getTarea(+req.params.id);
      return res.status(201).json(resultado);
    } catch (error) {
      return res.status(400).json({
        message: "CONTROLLER Error al consultar la tarea",
        content: error.message,
      });
    }
  }

  static async deleteTarea(req, res) {
    try {
      const resultado = await TareaService.deleteTarea(+req.params.id);
      return res.status(201).json(resultado);
    } catch (error) {
      return res.status(400).json({
        message: "CONTROLLER Error al consultar la tarea",
        content: error.message,
      });
    }
  }

  static async putTarea(req, res) {
    const id = +req.params.id;
    const { tarea, categoria, responsableId, deadline } = tareaDto(req.body);
    const { estado, creadorId, supervisorId } = req.body;
    const data = {
      tarea,
      categoria,
      estado,
      deadline: new Date(deadline),
      creadorId,
      responsableId,
      supervisorId,
    };
    try {
      const resultado = await TareaService.putTarea(id, data);
      return res.status(201).json(resultado);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: "CONTROLLER Error al actualizar la tarea",
        content: error.message,
      });
    }
  }
}
