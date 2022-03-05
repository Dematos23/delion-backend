const data = [
  { nombre: "LEGAL" },
  { nombre: "INTERNACIONAL" },
  { nombre: "HISPANA" },
  { nombre: "COBRANZA" },
  { nombre: "GERENCIA" },
];

export default async (prisma) => {
  data.forEach(async (element) => {
    await prisma.equipos.create({ data: element });
  });
};
