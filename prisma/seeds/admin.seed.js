import { hashSync } from "bcrypt";

export default async (prisma) => {
  const password = hashSync("Estudio123.", 10);

  await prisma.usuarios.upsert({
    create: {
      nombre: "Diego",
      apellido: "Matos",
      email: "dmatos@estudiodelion.com.pe",
      password,
      tipoUsuario: "SUPERADMIN",
    },
    update: {
      password,
    },
    where: {
      email: "dmatos@estudiodelion.com.pe",
    },
  });
};
