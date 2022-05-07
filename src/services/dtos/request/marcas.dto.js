import validator from "validator";

export function postMarcaDto({
  expediente,
  expedienteAno,
  tipoMarca,
  nombre,
  clases,
  descripcionLogo,
  productos,
  certificado,
  fechaVencimiento, //falta validar
  fechaPublicacion, //falta validar
}) {
  if (expediente || expedienteAno) {
    if (!(typeof expediente == "number")) {
      throw Error("DTO: El expediente debe ser un número entero");
    }
    if (!(typeof expedienteAno == "number")) {
      throw Error("DTO: El año del expediente debe ser un número entero");
    }
  }
  if (validator.isEmpty(tipoMarca)) {
    throw Error("DTO:debe especificar el tipo de marca");
  }
  if (tipoMarca === "figurativa") {
    if (validator.isEmpty(descripcionLogo)) {
      throw Error(
        "DTO: la descripcion del logo es obligatoria si la marca es figurativa"
      );
    }
  } else {
    if (validator.isEmpty(nombre)) {
      throw Error("DTO: Es obligatorio colocar el nombre de la marca");
    }
  }
  if (tipoMarca === "mixta") {
    if (validator.isEmpty(descripcionLogo)) {
      throw Error(
        "DTO: la descripcion del logo es obligatoria si la marca es figurativa"
      );
    }
    if (validator.isEmpty(nombre)) {
      throw Error("DTO: Es obligatorio colocar el nombre de la marca");
    }
  }
  if (tipoMarca === "nominativa") {
    if (validator.isEmpty(nombre)) {
      throw Error("DTO: Es obligatorio colocar el nombre de la marca");
    }
  }

  clases.forEach((clase) => {
    if (!(typeof clase === "number")) {
      throw Error("DTO: La clase debe ser un entero");
    }
    if (clase < 1 || clase > 45) {
      throw Error("DTO: No es una clase NIZA válida");
    }
  });

  if (validator.isEmpty(productos)) {
    throw Error("DTO: Se debe colocar la lista de productos");
  }

  if (certificado) {
    if (!(typeof certificado === "number")) {
      throw Error("DTO: el número de certificado no es un número");
    }
  }
  if (tipoMarca == "nominativa") {
    tipoMarca = "NOMINATIVIA";
  } else if (tipoMarca == "figurativa") {
    tipoMarca = "FIGURATIVA";
  } else if (tipoMarca == "mixta") {
    tipoMarca = "MIXTA";
  }

  return {
    expediente,
    expedienteAno,
    tipoMarca,
    nombre,
    clases,
    descripcionLogo,
    productos,
    certificado,
    fechaVencimiento,
    fechaPublicacion,
  };
}
