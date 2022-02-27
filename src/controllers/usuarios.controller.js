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
}
