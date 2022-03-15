import validator from "validator";

export function crearTareaDto({
  tarea,
  creadorId,
  responsableId,
  supervisorId,
  estado,
  deadline,
  descripcion,
}) {
  if (validator.isEmpty(tarea)) {
    throw Error("DTO: El nombre de la tarea no puede estar vacío");
  }
  if (!(typeof creadorId == "number")) {
    throw Error("DTO: Es necesario indicar el id del creado => Int");
  }
  if (!(typeof responsableId == "number")) {
    throw Error("DTO: Es necesario indicar el id del responsable => Int");
  }
  if (!(typeof supervisorId == "number")) {
    throw Error("DTO: Es necesario indicar el id del supervisor => Int");
  }
  if (validator.isEmpty(deadline)) {
    throw Error("DTO: Es necesario asignar un deadline para la tarea");
  }
  if (
    !(estado == "COMPLETO") &&
    !(estado == "EN_PROCESO") &&
    !(estado == "EN_REVISION")
  ) {
    throw Error("DTO: estado no contiene un valor valido");
  }
  if (!(typeof descripcion == "string")) {
    throw Error("DTO: Descrpción debe ser de tipo String");
  }
  return {
    tarea,
    creadorId,
    responsableId,
    supervisorId,
    deadline,
    estado,
    descripcion,
  };
}

export function getTareasDto({
  orderBy,
  sort,
  responsableId,
  supervisorId,
  estado,
}) {
  if (
    responsableId == undefined &&
    supervisorId == undefined &&
    estado == undefined
  ) {
    // console.log(orderBy, sort, responsableId, supervisorId, estado);
    throw Error("DTO: No se ha indicado ningún criterio de filtrado");
  }
  if ((orderBy && sort == undefined) || (orderBy == undefined && sort)) {
    throw Error(
      "DTO: Para ordernar las tareas es necesario especificar el valor de sort => String: 'asc' or 'desc'; y orderBy => String: tarea, deadline, responsable."
    );
  }
  if (!(typeof responsableId == "number") && !(responsableId == undefined)) {
    throw Error("DTO: responsableId debe ser entero");
  }
  if (!(typeof supervisorId == "number") && !(supervisorId == undefined)) {
    throw Error("DTO: responsableId debe ser entero");
  }
  if (!(estado == undefined)) {
    estado.forEach((e) => {
      if (!(e == "EN_PROCESO") && !(e == "EN_REVISION") && !(e == "COMPLETO")) {
        console.log(estado);
        throw Error("DTO: estado no contiene un valor valido");
      }
    });
  }
  if (orderBy == undefined && sort == undefined) {
    orderBy = "deadline";
    sort = "asc";
  }

  return { orderBy, sort, responsableId, supervisorId, estado };
}

export function putTareaDto({
  tarea,
  responsableId,
  supervisorId,
  deadline,
  estado,
}) {
  if (
    tarea == undefined &&
    responsableId == undefined &&
    supervisorId == undefined &&
    deadline == undefined &&
    estado == undefined
  ) {
    throw Error(
      "DTO: Es necesario especificar al menos una propiedad para actualizar la tarea"
    );
  }
  if (!(deadline == undefined)) {
    if (validator.isEmpty(deadline)) {
      throw Error("DTO: Es necesario asignar un deadline valido para la tarea");
    }
  }
  if (!(tarea == undefined)) {
    if (validator.isEmpty(tarea)) {
      throw Error("DTO: Tarea debe ser un String con al menos un caracter");
    }
  }
  if (!(tarea == undefined)) {
    if (
      !(estado == "COMPLETO") &&
      !(estado == "EN_PROCESO") &&
      !(estado == "EN_REVISION")
    ) {
      throw Error("DTO: estado no contiene un valor valido");
    }
  }
  if (!(responsableId == undefined)) {
    if (!(typeof responsableId == "number")) {
      throw Error("DTO: responsableId debe ser entero");
    }
  }
  if (!(supervisorId == undefined)) {
    if (!(typeof supervisorId == "number")) {
      throw Error("DTO: responsableId debe ser entero");
    }
  }

  return { tarea, responsableId, supervisorId, deadline, estado };
}
