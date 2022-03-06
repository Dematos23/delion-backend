import { hashSync } from "bcrypt";

export default async (prisma) => {
  const equipo = await prisma.equipos.findUnique({
    where: { nombre: "GERENCIA" },
  });
  console.log(equipo);
  const password = hashSync("Estudio123.", 10);
  await prisma.usuarios.upsert({
    create: {
      nombre: "Diego",
      apellido: "Matos",
      email: "dmatos@estudiodelion.com.pe",
      password,
      tipoUsuario: "SUPERADMIN",
      // equiposId: equipo.id,
    },
    update: {
      password,
    },
    where: {
      email: "dmatos@estudiodelion.com.pe",
    },
  });
};
