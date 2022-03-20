import { Router } from "express";
import { ArchivosTareaController } from "../controllers/archivos.tarea.controller.js";
import { validarUsuario } from "../utils/validator.js";

export const archivosTareaRouter = Router();

archivosTareaRouter
  .route("/archivosTareas")
  .post(validarUsuario, ArchivosTareaController.crearArchivo)
  .delete(validarUsuario, ArchivosTareaController.eliminarArchivo);
