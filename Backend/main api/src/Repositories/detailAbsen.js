import prisma from "../Database/db.js";

const findManyDetailAbsenByAbsenId = async (absenId) => {
  const detailAbsen = await prisma.detail_Absen.findMany({
    where: {
      id_absen: absenId,
    },
    include: {
      mahasiswa: true,
      absen: true,
    },
  });

  return detailAbsen;
};

const findManyDetailAbsenByMahasiswaId = async (mahasiswaId) => {
  const detailAbsen = await prisma.detail_Absen.findMany({
    where: {
      id_mahasiswa: mahasiswaId,
    },
    include: {
      mahasiswa: true,
      absen: {
        include: {
          dosen: true,
        },
      },
    },
  });

  return detailAbsen;
};
const findDetailAbsenByMahasiswaId = async (mahasiswaId, dosenId) => {
  const detailAbsen = await prisma.detail_Absen.findFirst({
    where: {
      id_mahasiswa: mahasiswaId,
      id_absen: dosenId,
    },
  });

  return detailAbsen;
};

const findDetailAbsenById = async (id) => {
  const detailAbsen = await prisma.detail_Absen.findUnique({
    where: {
      id,
    },
  });

  return detailAbsen;
};

// const findDetailAbsenByMahasiswaNim = async(mahasiswaNim) =>{

//   const detailAbsen = await prisma.detail_Absen.findFirst({
//     where:{

//     }
//   })
// }

const createDetailAbsen = async (absenId, mahasiswaId) => {
  console.log("data yang akan dipake buat detailAbsen : ", absenId);
  console.log("data yang akan dipake buat detailAbsen : ", mahasiswaId);

  const detailAbsen = await prisma.detail_Absen.create({
    data: {
      id_absen: absenId,
      id_mahasiswa: mahasiswaId,
    },
    include: {
      mahasiswa: true,
    },
  });

  return detailAbsen;
};

const countAbsen = async () => {
  const jumlahAbsen = await prisma.absen.count();

  return jumlahAbsen;
};

export {
  findManyDetailAbsenByAbsenId,
  findDetailAbsenById,
  findManyDetailAbsenByMahasiswaId,
  createDetailAbsen,
  findDetailAbsenByMahasiswaId,
  countAbsen,
};
