import { hashSync } from "bcrypt";
import { faker } from "@faker-js/faker";

const password = hashSync("Estudio123.", 10);

export default async (prisma) => {
  for (let i = 0; i < 20; i++) {
    const nombre = faker.name.firstName();
    const apellido = faker.name.lastName();
    const email = faker.internet.email(
      nombre,
      apellido,
      "estudiodelion.com.pe"
    );
    const tiposUsuario = ["ADMIN", "SUPERVISOR", "USUARIO"];
    const equipos = [
      "COBRANZA",
      "INTERNACIONAL",
      "HISPANA",
      "COBRANZA",
      "GERENCIA",
    ];

    function entero(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    }

    await prisma.usuarios.create({
      data: {
        nombre,
        apellido,
        email,
        password,
        tipoUsuario: tiposUsuario[entero(0, tiposUsuario.length)],
        equiposId: entero(1, equipos.length),
      },
    });
  }
};
