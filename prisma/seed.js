import Prisma from "@prisma/client";
import adminSeed from "./seeds/admin.seed.js";
import modulosSeed from "./seeds/modulos.seed.js";
import modulosUsuariosSeed from "./seeds/modulosUsuarios.seed.js";
import usuariosSeed from "./seeds/usuarios.seed.js";

const { PrismaClient } = Prisma;

const prisma = new PrismaClient();

async function main() {
  await Promise.all([
    // modulosSeed(prisma),
    adminSeed(prisma),
    // usuariosSeed(prisma),
    // modulosUsuariosSeed(prisma),
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
