import prisma from "../Database/db.js";

const findManyDosen = async () => {
  const dosen = await prisma.dosen.findMany({
    select: {
      id: true,
      email: true,
      nama: true,
    },
  });
  return dosen;
};

const findDosenByEmail = async (email) => {
  const dosen = await prisma.dosen.findUnique({
    where: {
      email,
    },
  });

  return dosen;
};

const findDosenById = async (id) => {
  const dosen = await prisma.dosen.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      nama: true,
    },
  });
  return dosen;
};

export { findDosenByEmail, findManyDosen, findDosenById };
