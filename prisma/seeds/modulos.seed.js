export default async (prisma) => {
  await prisma.modulos.upsert({
    create: {
      nombre: "dashboard",
    },
    update: {
      nombre: "dashboard",
    },
    where: {
      nombre: "dashboard",
    },
  });

  await prisma.modulos.upsert({
    create: {
      nombre: "tareas",
    },
    update: {
      nombre: "tareas",
    },
    where: {
      nombre: "tareas",
    },
  });
};
