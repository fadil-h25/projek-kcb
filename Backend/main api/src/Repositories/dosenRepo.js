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

const countDosen = async () => {
  const jumlahDosen = await prisma.dosen.count();

  return jumlahDosen;
};

const createDosen = async (nama, email, password) => {
  const dosen = await prisma.dosen.create({
    data: {
      nama,
      email,
      password,
    },
  });
  return dosen;
};

export {
  findDosenByEmail,
  findManyDosen,
  findDosenById,
  countDosen,
  createDosen,
};
