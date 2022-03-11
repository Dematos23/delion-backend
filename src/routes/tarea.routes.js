import { Router } from "express";
import { TareaController } from "../controllers/tarea.controller.js";
import {
  validarUsuario,
  validarPermisoPutTarea,
  validarPermisoDeleteTarea,
} from "../utils/validator.js";

export const tareaRouter = Router();

tareaRouter
  .route("/tarea")
  .post(validarUsuario, TareaController.crearTarea);
tareaRouter
  .route("/tareas")
  .post(validarUsuario, TareaController.getTareas);
tareaRouter
  .route("/tareas/:id")
  .get(validarUsuario, TareaController.getTarea)
  .put(validarUsuario, validarPermisoPutTarea, TareaController.putTarea)
  .delete(
    validarUsuario,
    validarPermisoDeleteTarea,
    TareaController.deleteTarea
  );
