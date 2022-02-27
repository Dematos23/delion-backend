import validator from "validator";
import { prisma } from "../../../prisma.js";

export function usuariosDto({
  nombre,
  apellido,
  email,
  password,
  tipoUsuario,
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
  return { nombre, apellido, email, password, tipoUsuario };
}

// if (validator.isEmpty(modulos)) {
//   throw Error("El usuario debe tener asignado al menos 1 modulo");
// }

// const emailEcontrado = await prisma.usuarios.findUnique(email);
// if (emailEcontrado) {
//   throw Error("El email del usuario ya está registrado");
// }
