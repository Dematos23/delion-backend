import { Router } from "express";
import { UsuariosController } from "../controllers/usuarios.controller.js";
import { validarSuperadmin, validarUsuario } from "../utils/validator.js";

export const usuariosRouter = Router();

usuariosRouter
  .route("/usuarios")
  .post(validarUsuario, validarSuperadmin, UsuariosController.crearUsuario)
  .get(validarUsuario, UsuariosController.getUsuarios);

usuariosRouter
  .route("/usuarios/:id")
  .get(validarUsuario, UsuariosController.getUsuario)
  .delete(validarUsuario, validarSuperadmin, UsuariosController.deleteUsuario)
  .put(validarUsuario, validarSuperadmin, UsuariosController.putUsuario);
