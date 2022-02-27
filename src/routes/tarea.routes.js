import { Router } from "express";
import { TareaController } from "../controllers/tarea.controller.js";
import { validarUsuario } from "../utils/validator.js";

export const tareaRouter = Router();

tareaRouter
  .route("/tareas")
  .get(TareaController.getTareas)
  // .get(validarUsuario, TareaController.getTareas)
  .post(validarUsuario, TareaController.crearTarea);
tareaRouter
  .route("/tareas/:id")
  .get(validarUsuario, TareaController.getTarea)
  .put(validarUsuario, TareaController.putTarea)
  .delete(validarUsuario, TareaController.deleteTarea);
