import { Router } from "express";
import { UsuariosController } from "../controllers/usuarios.controller.js";
import { validarUsuario } from "../utils/validator.js";

export const usuariosRouter = Router();

usuariosRouter
  .route("/usuarios")
  .post(validarUsuario, UsuariosController.crearUsuario);
