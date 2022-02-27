import validator from "validator";

export function tareaDto({ tarea, categoria, responsableId, deadline }) {
  if (validator.isEmpty(tarea)) {
    throw Error("El nombre de la tarea no puede estar vacío");
  }
  if (validator.isEmpty(categoria)) {
    throw Error("Es necesario seleccionar una categoria");
  }
  if (validator.isEmpty(responsableId.toString())) {
    throw Error("Es necesario asignar un responsable para la tarea");
  }
  if (!validator.isDate(deadline.toString())) {
    throw Error("Es necesario asignar un deadline para la tarea");
  }
  return { tarea, categoria, responsableId, deadline };
}
