import Prisma from "@prisma/client";
import adminSeed from "../../prisma/seeds/admin.seed.js";
import tareasSeed from "../../prisma/seeds/tareas.seed.js";
import usuariosSeed from "../../prisma/seeds/usuarios.seed.js";
import equiposSeed from "../../prisma/seeds/equipos.seed.js";

const { PrismaClient } = Prisma;

const prisma = new PrismaClient();

export async function main() {
  //   await equiposSeed(prisma);
  await adminSeed(prisma);
  await usuariosSeed(prisma);
  await tareasSeed(prisma);
  return { message: "Heroku Seed completo" };
}

// import { prisma } from "../prisma.js";
// import { hashSync } from "bcrypt";
// import { faker } from "@faker-js/faker";

// export class HerokuService {
//   static async seed() {
//     try {
//       const equipos = [
//         { nombre: "LEGAL" },
//         { nombre: "INTERNACIONAL" },
//         { nombre: "HISPANA" },
//         { nombre: "COBRANZA" },
//         { nombre: "GERENCIA" },
//       ];

//       const tiposUsuario = ["ADMIN", "SUPERVISOR", "USUARIO"];
//       const estados = ["COMPLETO", "EN_PROCESO", "EN_REVISION"];
//       const password = hashSync("Estudio123.", 10);

//       function entero(min, max) {
//         min = Math.ceil(min);
//         max = Math.floor(max);
//         return Math.floor(Math.random() * (max - min) + min);
//       }

//       const equiposSeed = async (prisma) => {
//         equipos.forEach(async (element) => {
//           await prisma.equipos.create({ data: element });
//         });
//       };

//       const adminSeed = async (prisma) => {
//         const equipo = await prisma.equipos.findUnique({
//           where: { nombre: "GERENCIA" },
//         });

//         await prisma.usuarios.upsert({
//           create: {
//             nombre: "Diego",
//             apellido: "Matos",
//             email: "dmatos@estudiodelion.com.pe",
//             password,
//             tipoUsuario: "SUPERADMIN",
//             equiposId: equipo.id,
//           },
//           update: {
//             password,
//           },
//           where: {
//             email: "dmatos@estudiodelion.com.pe",
//           },
//         });
//       };

//       const usuariosSeed = async (prisma) => {
//         for (let i = 0; i < 20; i++) {
//           const nombre = faker.name.firstName();
//           const apellido = faker.name.lastName();
//           const email = faker.internet.email(
//             nombre,
//             apellido,
//             "estudiodelion.com.pe"
//           );

//           await prisma.usuarios.create({
//             data: {
//               nombre,
//               apellido,
//               email,
//               password,
//               tipoUsuario: tiposUsuario[entero(0, tiposUsuario.length)],
//               equiposId: entero(1, equipos.length),
//             },
//           });
//         }
//       };

//       const tareasSeed = async (prisma) => {
//         const superadmin = await prisma.usuarios.findUnique({
//           where: { email: "dmatos@estudiodelion.com.pe" },
//         });
//         const usuarios = await prisma.usuarios.findMany({
//           select: { id: true },
//         });

//         for (let i = 0; i < 100; i++) {
//           const tarea = `${faker.word.verb()} the task`;
//           const deadline = faker.date.future();

//           const data = {
//             tarea,
//             deadline,
//             estado: estados[entero(0, estados.length)],
//             creador: { connect: { id: superadmin.id } },
//             responsable: { connect: { id: entero(2, usuarios.length) } },
//             supervisor: { connect: { id: entero(2, usuarios.length) } },
//           };

//           await prisma.tareas.create({ data });
//         }
//       };

//       equiposSeed(prisma);
//       adminSeed(prisma);
//       usuariosSeed(prisma);
//       tareasSeed(prisma);
//     } catch (error) {
//       return {
//         message: "Error en HerokuService",
//         content: error.message,
//       };
//     }
//   }
// }
