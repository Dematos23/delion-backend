import { Router } from "express";
import { MarcasController } from "../controllers/marcas.controller.js";
import { validarUsuario } from "../utils/validator.js";

export const marcasRouter = Router();

marcasRouter
  .route("/marca")
  .post(validarUsuario, MarcasController.postMarca)
  .delete(validarUsuario, MarcasController.deleteMarca);
marcasRouter
  .route("/marcas")
  .post(validarUsuario, MarcasController.postMarcas)
  .get(validarUsuario, MarcasController.getMarcas);
