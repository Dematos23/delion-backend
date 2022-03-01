import Prisma from "@prisma/client";
import adminSeed from "./seeds/admin.seed.js";
import tareasSeed from "./seeds/tareas.seed.js";
import usuariosSeed from "./seeds/usuarios.seed.js";

const { PrismaClient } = Prisma;

const prisma = new PrismaClient();

async function main() {
  await Promise.all([
    // modulosSeed(prisma),
    // modulosUsuariosSeed(prisma),
    adminSeed(prisma),
    usuariosSeed(prisma),
    tareasSeed(prisma),
  ]);
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
