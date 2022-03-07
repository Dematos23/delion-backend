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

export function getUsuarioDto(id) {
  if (!(typeof id == "number")) {
    throw Error("El id del usuario para eliminar debe ser un entero");
  }
  return { id };
}

export function deleteUsuarioDto(id) {
  if (!(typeof id == "number")) {
    throw Error("El id del usuario para eliminar debe ser un entero");
  }
  return id;
}

export function putUsuarioDto({
  nombre,
  apellido,
  email,
  password,
  tipoUsuario,
  equipoId,
}) {
  if (
    nombre == undefined &&
    apellido == undefined &&
    email == undefined &&
    password == undefined &&
    tipoUsuario == undefined &&
    equipoId == undefined
  ) {
    throw Error(
      "Debe indicarse al menos una propiedad para actualizar el usuario"
    );
  }
  if (!(nombre == undefined)) {
  }
  if (validator.isEmpty(nombre)) {
    throw Error("El nombre del usuario no puede estar vacio");
  }
  if (!(apellido == undefined)) {
    if (validator.isEmpty(apellido)) {
      throw Error("El apellido del usuario no puede estar vacio");
    }
  }
  if (!(email == undefined)) {
    if (!validator.isEmail(email)) {
      throw Error("El email del usuario debe ser un email valido");
    }
  }
  if (!(password == undefined)) {
    if (validator.isEmpty(password)) {
      throw Error("El password del usuario no puede estar vacio");
    }
  }
  if (!(tipoUsuario == undefined)) {
    if (validator.isEmpty(tipoUsuario)) {
      throw Error("El nombre del usuario no puede estar vacio");
    }
  }
  if (!(equipoId == undefined)) {
    if (!(typeof equipoId == "number")) {
      throw Error("El nombre del usuario no puede estar vacio");
    }
  }

  return { nombre, apellido, email, password, tipoUsuario, equipoId };
}
