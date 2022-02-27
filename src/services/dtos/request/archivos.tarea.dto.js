import validator from "validator";

export function archivosTareaDto({ tareaId, contentType, ext, filename }) {
  if (validator.isEmpty(tareaId.toString())) {
    throw Error("El id de la tarea no puede estar vacío");
  }
  if (!validator.isNumeric(tareaId.toString())) {
    throw Error("El id de la tarea debe ser numérico");
  }
  if (validator.isEmpty(contentType)) {
    throw Error("Es necesario especificar el contentType");
  }
  if (contentType !== "application/pdf") {
    throw Error("El contentType debe ser pdf");
  }
  if (validator.isEmpty(ext)) {
    throw Error("Es necesario especificar la extension");
  }
  if (!validator.equals(ext, "pdf")) {
    throw Error("La extensión del archivo debe ser pdf");
  }
  if (validator.isEmpty(filename)) {
    throw Error("Es necesario especificar el nombre del archivo");
  }
  return { tareaId, contentType, ext, filename };
}
