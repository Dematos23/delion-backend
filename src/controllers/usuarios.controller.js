import { UsuariosService } from "../services/usuarios.service.js";
import {
  usuariosDto,
  deleteUsuarioDto,
  getUsuarioDto,
  putUsuarioDto,
} from "../services/dtos/request/usuarios.dto.js";

export class UsuariosController {
  static async crearUsuario(req, res) {
    try {
      const data = usuariosDto(req.body);
      const resultado = await UsuariosService.crearUsuario(data);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(400).json({
        error: error.message,
        message: "Error al hacer el login",
      });
      console.log(error);
    }
  }

  static async getUsuario(req, res) {
    try {
      const usuarioId = getUsuarioDto(+req.params.id);
      const resultado = await UsuariosService.getUsuario(usuarioId.id);
      return res.status(200).json(resultado);
    } catch (error) {
      return res.status(400).json({
        message: "CONTROLLER Error al consultar el usuario",
        content: error.message,
      });
    }
  }

  static async getUsuarios(req, res) {
    try {
      const resultado = await UsuariosService.getUsuarios();
      return res.status(200).json(resultado);
    } catch (error) {
      return res.status(400).json({
        message: "CONTROLLER Error al consultar usuarios",
        content: error.message,
      });
    }
  }

  static async deleteUsuario(req, res) {
    try {
      const id = deleteUsuarioDto(+req.params.id);
      const resultado = await UsuariosService.deleteUsuario(id);
      return res.status(201).json(resultado);
    } catch (error) {
      return res.status(400).json({
        message: "CONTROLLER Error al eliminar el usuario",
        content: error.message,
      });
    }
  }

  static async putUsuario(req, res) {
    try {
      const id = +req.params.id;
      const { nombre, apellido, email, password, tipoUsuario, equipoId } =
        putUsuarioDto(req.body);
      const data = { nombre, apellido, email, password, tipoUsuario, equipoId };

      const resultado = await UsuariosService.putUsuario(id, data);
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
