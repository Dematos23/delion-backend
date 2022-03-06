import { UsuariosService } from "../services/usuarios.service.js";
import { usuariosDto } from "../services/dtos/request/usuarios.dto.js";

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

  static async deleteUsuario(req, res) {
    try {
      const resultado = await UsuariosService.deleteUsuario(+req.params.id);
      return res.status(201).json(resultado);
    } catch (error) {
      return res.status(400).json({
        message: "CONTROLLER Error al eliminar el usuario",
        content: error.message,
      });
    }
  }
}
