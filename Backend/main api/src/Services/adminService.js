import { ResponError } from "../Errors/responError.js";
import { findManyAbsen } from "../Repositories/absenRepo.js";
import { createAdmin, findAdminById } from "../Repositories/adminRepo.js";
import { countAbsen } from "../Repositories/detailAbsen.js";

import {
  countDosen,
  createDosen,
  findManyDosen,
} from "../Repositories/dosenRepo.js";
import {
  countMahasiswa,
  createMahasiswa,
  findManyMahasiswa,
} from "../Repositories/mahasiswaRepo.js";

const getAllStudent = async () => {
  const students = await findManyMahasiswa();

  if (!students.length > 0)
    throw new ResponError("404", "Mahasiswa tidak ditemukan");

  const filteredStudents = students.map(({ nama, nim, email }) => ({
    nama,
    nim,
    email,
  }));

  return filteredStudents;
};

const getAllDosen = async () => {
  const dosen = await findManyDosen();
  const filteredDosen = dosen.map(({ nama, email }) => ({ nama, email }));

  if (filteredDosen.length < 1) {
    ResponError(404, "Dosen not found");
  }

  return filteredDosen;
};

const getAllAbsen = async () => {
  const absen = await findManyAbsen();

  if (absen.length < 1) throw new ResponError(404, "Absen not found");

  const filteredAbsen = absen.map(
    ({ id, mata_kuliah, waktu_dibuat, dosen: { nama } }) => ({
      id,
      mata_kuliah,
      dosen,
      waktu_dibuat,
      nama,
    })
  );

  return filteredAbsen;
};

const addAdmin = async (nama, email, password) => {
  const admin = await createAdmin(nama, email, password);
  return admin;
};

const countItems = async () => {
  const jumlahDosen = await countDosen();
  const jumlahMahasiswa = await countMahasiswa();
  const jumlahAbsen = await countAbsen();

  if (jumlahAbsen > 0 && jumlahDosen > 0 && jumlahMahasiswa > 0) {
    return { jumlahAbsen, jumlahDosen, jumlahMahasiswa };
  }

  throw new ResponError(404, "Items not found");
};

const addMahasiswa = async (nama, nim, email, password) => {
  const mahasiswa = await createMahasiswa(nama, nim, email, password);

  if (!mahasiswa) throw new ResponError(404, "Gagal membuat akun mahasiswa");

  return mahasiswa;
};

const addDosen = async (nama, email, password) => {
  const dosen = await createDosen(nama, email, password);
  if (!dosen) throw new ResponError(400, "Gagal membuat akun dosen");
  return dosen;
};

const getAdmin = async (id) => {
  const admin = findAdminById(id);
  if (!admin) throw ResponError(404, "user not found");

  return admin;
};

export default {
  getAllStudent,
  addMahasiswa,
  getAllDosen,
  getAllAbsen,
  addAdmin,
  countItems,
  addDosen,
  getAdmin,
};
