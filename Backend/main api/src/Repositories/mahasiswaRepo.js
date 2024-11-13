import prisma from "../Database/db.js";

const findMahasiswaByNim = async (nim) => {
  const mahasiswa = await prisma.mahasiswa.findUnique({
    where: {
      nim,
    },
  });
  return mahasiswa;
};

const findMahasiswaByEmail = async (email) => {
  const mahasiswa = await prisma.mahasiswa.findUnique({
    where: {
      email,
    },
  });

  return mahasiswa;
};

const findMahasiswaById = async (id) => {
  const mahasiswa = await prisma.mahasiswa.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      nama: true,
      nim: true,
      password: false,
    },
  });
  return mahasiswa;
};

const findManyMahasiswa = async () => {
  const mahasiswa = await prisma.mahasiswa.findMany();
  return mahasiswa;
};

export {
  findMahasiswaByNim,
  findManyMahasiswa,
  findMahasiswaById,
  findMahasiswaByEmail,
};
