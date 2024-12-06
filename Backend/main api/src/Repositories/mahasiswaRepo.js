import prisma from "../Database/db.js";
import { v2 as cloudinary } from "cloudinary";

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

const countMahasiswa = async () => {
  const jumlahMahasiswa = await prisma.mahasiswa.count();

  return jumlahMahasiswa;
};

const createMahasiswa = async (nama, nim, email, password) => {
  console.log("ini nim yang akan di install ", nim);

  const mahasiswa = await prisma.mahasiswa.create({
    data: {
      nama,
      nim,
      email,
      password,
    },
  });

  return mahasiswa;
};

export {
  findMahasiswaByNim,
  findManyMahasiswa,
  findMahasiswaById,
  findMahasiswaByEmail,
  countMahasiswa,
  createMahasiswa,
};
