import {
  crearTareaDto,
  getTareasDto,
  putTareaDto,
} from "../services/dtos/request/tareas.dto.js";
import { TareaService } from "../services/tarea.service.js";

export class TareaController {
  static async crearTarea(req, res) {
    try {
      const data = crearTareaDto(req.body);
      data.deadline = new Date(req.body.deadline);
      const resultado = await TareaService.crearTarea(data);
      return res.status(201).json(resultado);
    } catch (error) {
      console.log(error);
      console.log(req);
      return res.status(400).json({
        message: "CONTROLLER Error al crear la tarea",
        content: error.message,
      });
    }
  }

  static async getTareas(req, res) {
    try {
      const data = getTareasDto(req.body);
      const resultado = await TareaService.getTareas(data);
      return res.status(200).json(resultado);
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
    try {
      const id = +req.params.id;
      const { tarea, responsableId, deadline, estado, supervisorId } =
        putTareaDto(req.body);
      const data = {
        tarea,
        estado,
        deadline: new Date(deadline),
        responsableId,
        supervisorId,
      };

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
