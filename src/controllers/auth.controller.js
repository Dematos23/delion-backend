import { AuthService } from "../services/auth.service.js";
import { loginDto } from "../services/dtos/request/login.dto.js";

export async function login(req, res) {
  try {
    const { email } = loginDto(req.body);
    const { password } = req.body;
    const result = await AuthService.login({ email, password });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Error al hacer el login",
    });
    console.log(error);
  }
}
