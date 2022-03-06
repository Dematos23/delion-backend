import Prisma from "@prisma/client";
import adminSeed from "../../prisma/seeds/admin.seed.js";
import tareasSeed from "../../prisma/seeds/tareas.seed.js";
import usuariosSeed from "../../prisma/seeds/usuarios.seed.js";
import equiposSeed from "../../prisma/seeds/equipos.seed.js";

const { PrismaClient } = Prisma;

const prisma = new PrismaClient();

export async function main() {
  //   await equiposSeed(prisma);
  //   await adminSeed(prisma);
  //   await usuariosSeed(prisma);
  //   await tareasSeed(prisma);
  return { message: "Heroku Seed completo" };
}
