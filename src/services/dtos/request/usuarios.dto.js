import validator from "validator";
import { prisma } from "../../../prisma.js";

export async function usuariosDto({
  nombre,
  apellido,
  email,
  password,
  tipoUsuario,
  equipo,
}) {
  if (validator.isEmpty(nombre)) {
    throw Error("El nombre del usuario no puede estar vacio");
  }
  if (validator.isEmpty(apellido)) {
    throw Error("El apellido del usuario no puede estar vacio");
  }
  if (!validator.isEmail(email)) {
    throw Error("El email del usuario debe ser un email valido");
  }
  if (validator.isEmpty(password)) {
    throw Error("El password del usuario no puede estar vacio");
  }
  if (validator.isEmpty(tipoUsuario)) {
    throw Error("El nombre del usuario no puede estar vacio");
  }
  const equipoEncontrado = await prisma.equipos.findUnique({
    where: { nombre: equipo },
  });
  const equipoId = equipoEncontrado.id;
  return { nombre, apellido, email, password, tipoUsuario, equipoId };
}

export async function deleteUsuarioDto(
  usuarioEliminadorId,
  usuarioParaEliminarId
) {
  if (!(typeof usuarioEliminadorId == "number")) {
    throw Error("El id del usuario eliminador debe ser un entero");
  }
  if (!(typeof usuarioParaEliminarId == "number")) {
    throw Error("El id del usuario para eliminar debe ser un entero");
  }
  const usuarioEliminador = await prisma.usuarios.findUnique({
    where: { id: usuarioEliminadorId },
  });
  if (!(usuarioEliminador.tipoUsuario = "SUPERADMIN")) {
    throw Error("Se necesitan privilegios de super administrador");
  }
  return { usuarioParaEliminarId };
}

// if (validator.isEmpty(modulos)) {
//   throw Error("El usuario debe tener asignado al menos 1 modulo");
// }

// const emailEcontrado = await prisma.usuarios.findUnique(email);
// if (emailEcontrado) {
//   throw Error("El email del usuario ya está registrado");
// }
