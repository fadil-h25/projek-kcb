import { ResponError } from "../Errors/responError.js";
import { findManyDetailAbsenByMahasiswaId } from "../Repositories/detailAbsen.js";
import {
  findMahasiswaByEmail,
  findMahasiswaById,
} from "../Repositories/mahasiswaRepo.js";

const getMahasiswaByEmail = async (email) => {
  const mahasiswa = await findMahasiswaByEmail(email);
  if (!mahasiswa) throw new ResponError(404, "Mahasiswa tidak ditemukan");

  return mahasiswa;
};

const getMahasiswaById = async (id) => {
  const mahasiswa = await findMahasiswaById(id);
  if (!mahasiswa) throw new ResponError(404, "Mahasiswa tidak ditemukan");

  return mahasiswa;
};

const getAllDetailAbsenById = async (mahasiswaId) => {
  const detailAbsen = await findManyDetailAbsenByMahasiswaId(mahasiswaId);
  if (!detailAbsen) throw new ResponError(404, "Detail absen tidak ditemukan");

  const filteredDetailAbsen = detailAbsen.map(
    ({
      id,
      id_absen,
      id_mahasiswa,
      waktu_diabsen,
      absen: {
        mata_kuliah,
        waktu_dibuat,
        dosen: { nama, email },
      },
    }) => ({
      id,
      id_absen,
      id_mahasiswa,
      waktu_diabsen,
      nama,
      mata_kuliah,
      waktu_dibuat,
      email,
    })
  );

  return filteredDetailAbsen;
};

export default { getAllDetailAbsenById, getMahasiswaByEmail, getMahasiswaById };
