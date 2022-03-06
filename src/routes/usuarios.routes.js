import { Router } from "express";
import { UsuariosController } from "../controllers/usuarios.controller.js";
import { validarSuperadmin, validarUsuario } from "../utils/validator.js";

export const usuariosRouter = Router();

usuariosRouter
  .route("/usuarios")
  .post(validarUsuario, validarSuperadmin, UsuariosController.crearUsuario);

usuariosRouter
  .route("/usuarios/:id")
  .delete(validarUsuario, validarSuperadmin, UsuariosController.deleteUsuario);
