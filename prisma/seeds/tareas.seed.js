import { faker } from "@faker-js/faker";

export default async (prisma) => {
  function entero(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
  const estados = ["COMPLETO", "EN_PROCESO", "EN_REVISION"];
  const superadmin = await prisma.usuarios.findUnique({
    where: { email: "dmatos@estudiodelion.com.pe" },
  });
  const usuarios = await prisma.usuarios.findMany({ select: { id: true } });

  for (let i = 0; i < 100; i++) {
    const tarea = `${faker.word.verb()} the task`;
    const deadline = faker.date.future();

    const data = {
      tarea,
      deadline,
      estado: estados[entero(0, estados.length)],
      creador: { connect: { id: superadmin.id } },
      responsable: { connect: { id: entero(2, usuarios.length) } },
      supervisor: { connect: { id: entero(2, usuarios.length) } },
    };

    await prisma.tareas.create({ data });
  }
};
