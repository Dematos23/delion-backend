import { prisma } from "../prisma.js";
import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  static async login({ email, password }) {
    console.log("auth service");
    const usuarioEcontrado = await prisma.usuarios.findUnique({
      where: { email },
      select: {
        password: true,
        // tipoUsuario: true,
        id: true,
        nombre: true,
        apellido: true,
      },
      rejectOnNotFound: true,
    });

    const resultado = compareSync(password, usuarioEcontrado.password);

    if (resultado) {
      const token = jwt.sign(
        {
          id: usuarioEcontrado.id,
          nombre: usuarioEcontrado.nombre,
          apellido: usuarioEcontrado.apellido,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      return {
        message: "ok",
        token,
        usuarioId: usuarioEcontrado.id,
        nombre: usuarioEcontrado.nombre,
        apellido: usuarioEcontrado.apellido,
      };
    } else {
      return { message: "Credenciales incorrectas" };
    }
  }
}
