import jwt from "jsonwebtoken";
import { prisma } from "../prisma.js";

function verificarToken(token) {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload;
  } catch (error) {
    return error;
  }
}

export async function validarUsuario(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Se necesita una token para realizar la solicitud",
    });
  }
  const token = req.headers.authorization.split(" ")[1];
  const resultado = verificarToken(token);
  if (resultado instanceof jwt.JsonWebTokenError) {
    return res.status(403).json({
      message: "La token es invalida",
      razon: resultado.message,
    });
  }
  const usuario = await prisma.usuarios.findUnique({
    where: { id: resultado.id },
    select: { id: true },
  });
  req.usuario = usuario;
  next();
}

export async function validarSuperadmin(req, res, next) {
  const creador = await prisma.usuarios.findUnique({
    where: { id: req.body.creadorId },
    select: { tipoUsuario: true },
  });
  if (!(creador.tipoUsuario == "SUPERADMIN")) {
    return res.status(401).json({
      message: "Se necesita privilegios de Superadministrador",
    });
  }
  req.usuario = creador;
  next();
}
