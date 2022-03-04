import validator from "validator";

export function crearTareaDto({ tarea, categoria, responsableId, deadline }) {
  if (validator.isEmpty(tarea)) {
    throw Error("DTO: El nombre de la tarea no puede estar vacío");
  }
  if (validator.isEmpty(categoria)) {
    throw Error("DTO: Es necesario seleccionar una categoria");
  }
  if (validator.isEmpty(responsableId.toString())) {
    throw Error("DTO: Es necesario asignar un responsable para la tarea");
  }
  if (!validator.isDate(deadline.toString())) {
    throw Error("DTO: Es necesario asignar un deadline para la tarea");
  }
  return { tarea, categoria, responsableId, deadline };
}

export function getTareasDto({
  justLogin,
  orderBy,
  sort,
  responsableId,
  estado,
}) {
  if (
    justLogin == undefined &&
    orderBy == undefined &&
    sort == undefined &&
    responsableId == undefined &&
    estado == undefined
  ) {
    throw Error(
      "DTO: Es necesario especificar al menos el valor de justLogin para cualquier consulta de tareas"
    );
  }
  if (
    justLogin == undefined ||
    validator.isEmpty(justLogin.toString()) ||
    !(typeof justLogin == "boolean")
  ) {
    throw Error(
      "DTO: Es necesario especificar correctamente el valor de justLogin => boolean: true para la primera consulta de tareas (filtro y ordenamiento por default) o false para un filtro y ordenamiento específicos"
    );
  }
  if (justLogin == true && (orderBy || sort || responsableId || estado)) {
    throw Error(
      "DTO: justLogin = true & se ha colocado orderBy || sort || responsableId || estado. En la consulta inicial el UNICO argumento debe ser justLogin con valor true => boolean. Si se está realizando un filtrado u ordenamiento de tareas, el valor de justLogin debe ser false => boolean. Si se está realizando"
    );
  }
  if (orderBy == undefined || sort == undefined) {
    throw Error(
      "DTO: Para ordernar las tareas es necesario especificar el valor de sort => String: 'asc' or 'desc'; y orderBy => String: tarea, deadline, responsable."
    );
  }
  if (!validator.isNumeric(responsableId.toString())) {
    throw Error("DTO: responsableId debe ser enero => Int");
  }

  return { orderBy, sort, responsableId, estado };
}
