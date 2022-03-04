import { faker } from "@faker-js/faker";

export default async (prisma) => {
  for (let i = 0; i < 50; i++) {
    const superadminId = 1;
    const tarea = `${faker.word.verb()} the task`;
    const deadline = faker.date.future();
    const estados = ["COMPLETO", "EN_PROCESO", "EN_REVISION"];

    function entero(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    }

    await prisma.tareas.create({
      data: {
        tarea,
        deadline,
        estado: estados[entero(0, estados.length)],
        creadorId: superadminId,
        responsableId: entero(1, 22),
        supervisorId: entero(1, 22),
      },
    });
  }
};
