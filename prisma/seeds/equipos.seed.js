const equipos = [
  { nombre: "LEGAL" },
  { nombre: "INTERNACIONAL" },
  { nombre: "HISPANA" },
  { nombre: "COBRANZA" },
  { nombre: "GERENCIA" },
];

export default async (prisma) => {
  equipos.forEach(async (element) => {
    await prisma.equipos.create({ data: element });
  });
};
