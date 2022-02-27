export default async (prisma) => {
  await prisma.modulosUsuarios.upsert({
    create: {
      usuarioId: 1,
      moduloId: 1,
      assignedBy: "Diego Matos",
    },
    update: {},
    where: {
      usuarioId_moduloId: { usuarioId: 1, moduloId: 1 },
    },
  });

  await prisma.modulosUsuarios.upsert({
    create: {
      usuarioId: 1,
      moduloId: 2,
      assignedBy: "Diego Matos",
    },
    update: {},
    where: {
      usuarioId_moduloId: { usuarioId: 1, moduloId: 2 },
    },
  });

  await prisma.modulosUsuarios.upsert({
    create: {
      usuarioId: 2,
      moduloId: 1,
      assignedBy: "Diego Matos",
    },
    update: {},
    where: {
      usuarioId_moduloId: { usuarioId: 2, moduloId: 1 },
    },
  });

  await prisma.modulosUsuarios.upsert({
    create: {
      usuarioId: 2,
      moduloId: 2,
      assignedBy: "Diego Matos",
    },
    update: {},
    where: {
      usuarioId_moduloId: { usuarioId: 2, moduloId: 2 },
    },
  });
};
