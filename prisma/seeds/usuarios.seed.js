import { hashSync } from "bcrypt";

export default async (prisma) => {
  const password = hashSync("Estudio123.", 10);

  await prisma.usuarios.upsert({
    create: {
      nombre: "Steve",
      apellido: "Morales",
      email: "steve.gerencia@estudiodelion.com.pe",
      password,
      tipoUsuario: "USUARIO",
    },
    update: {
      password,
    },
    where: {
      email: "steve.gerencia@estudiodelion.com.pe",
    },
  });
};
