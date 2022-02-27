import validator from "validator";

export function loginDto({ email }) {
  if (!validator.isEmail(email)) {
    throw Error("El correo debe ser un correo valido");
  }
  return { email };
}
