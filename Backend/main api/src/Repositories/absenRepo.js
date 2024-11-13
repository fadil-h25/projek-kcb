import prisma from "../Database/db.js";

const findManyAbsenByDosenId = async (dosenId) => {
  const absen = await prisma.absen.findMany({
    where: {
      id_dosen: dosenId,
    },
    include: {
      dosen: true,
    },
    orderBy: {
      waktu_dibuat: "asc",
    },
  });

  return absen;
};

const findAbsenById = async (id) => {
  const absen = await prisma.absen.findMany({
    where: {
      id,
    },
  });
  return absen;
};

const createAbsen = async (dosenId, mataKuliah) => {
  const absen = await prisma.absen.create({
    data: {
      id_dosen: dosenId,
      mata_kuliah: mataKuliah,
    },
  });
  return absen;
};

export { findManyAbsenByDosenId, findAbsenById, createAbsen };
