import {
  findManyAbsenByDosenId,
  createAbsen,
} from "../Repositories/absenRepo.js";
import {
  findManyDetailAbsenByAbsenId,
  createDetailAbsen,
  findManyDetailAbsenByMahasiswaId,
  findDetailAbsenByMahasiswaId,
} from "../Repositories/detailAbsen.js";
import { findDosenById, findDosenByEmail } from "../Repositories/dosenRepo.js";
import { ResponError } from "../Errors/responError.js";
import fetch from "node-fetch";
import { findMahasiswaByNim } from "../Repositories/mahasiswaRepo.js";

const getDosenByEmail = async (email) => {
  const dosen = await findDosenByEmail(email);
  if (!dosen) throw new ResponError(404, "Dosen tidak ditemukan");
  return dosen;
};

const getDosenById = async (dosenId) => {
  if (!dosenId) throw new ResponError(400, "dosenId kosong");
  const dosen = await findDosenById(dosenId);

  if (!dosen) throw new ResponError(404, "dosen tidak ditemukan");

  const { id, nama, email } = dosen;
  return { id, nama, email };
};

const getAllAbsenByDosenId = async (dosenId) => {
  if (!dosenId) throw new ResponError(400, "dosenId kosong");
  const absen = await findManyAbsenByDosenId(dosenId);
  if (absen.length == 0) throw new ResponError(404, "absen tidak ditemukan");
  const filteredAbsen = absen.map(
    ({ id, id_dosen, mata_kuliah, waktu_dibuat, dosen: { nama, email } }) => ({
      id,
      mata_kuliah,
      id_dosen,
      nama,
      email,
      waktu_dibuat,
    })
  );

  return filteredAbsen;
};

const getAllDetailAbsenByAbsenId = async (absenId) => {
  if (!absenId) throw new ResponError(400, "absenId kosong");
  const detailAbsen = await findManyDetailAbsenByAbsenId(absenId);

  if (detailAbsen.length == 0)
    throw new ResponError(404, "detail absen tidak ditemukan");

  const filteredDesainAbsen = detailAbsen.map(
    ({
      id,
      id_absen,
      id_mahasiswa,
      waktu_diabsen,
      absen: { mata_kuliah },
      mahasiswa: { nama, nim },
    }) => {
      return {
        id,
        id_absen,
        id_mahasiswa,
        waktu_diabsen,
        nim,
        nama,
        mata_kuliah,
      };
    }
  );
  return filteredDesainAbsen;
};

const addAbsen = async (dosenId, mataKuliah) => {
  const absen = await createAbsen(dosenId, mataKuliah);
  if (!absen) throw new ResponError(400, "Gagal membuat absen");
  return absen;
};

const fetcApiPython = async (imageData) => {
  const resultPythonResponse = await fetch("http://localhost:5000/absensi", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image: imageData }),
  });
  console.log(resultPythonResponse.ok);

  if (resultPythonResponse.ok == false) {
    throw new Error("Error fetching data from Python API");
  }
  const resultPython = await resultPythonResponse.json();
  return resultPython;
};

const addDetailAbsen = async (absenId, imageData) => {
  const resultPythonResponse = await fetcApiPython(imageData);
  console.log("ini respon dari api python : ", resultPythonResponse);
  console.log("ini absen Id :", absenId);

  if (resultPythonResponse.data == "gagal")
    throw new ResponError(404, "Wajah tidak terdaftar");
  console.log("add detail absen check1");
  console.log(resultPythonResponse.data);

  const mahasiswa = await findMahasiswaByNim(resultPythonResponse.data);

  if (!mahasiswa) throw new ResponError(404, `Mahasiswa tidak ditemukan`);

  console.log("add detail absen check2 dan ini isi absenId,", absenId);

  const detaiAbsenDb = await findDetailAbsenByMahasiswaId(
    mahasiswa.id,
    absenId
  );
  console.log("detailabsenByMahasiswaId didapat : ", detaiAbsenDb);
  console.log("absen_id yang akan digunkan : ", absenId);

  if (detaiAbsenDb) {
    if (
      detaiAbsenDb.id_absen == absenId &&
      detaiAbsenDb.id_mahasiswa == mahasiswa.id
    ) {
      throw new ResponError(409, "Mahasiswa sudah diabsen");
    }
  }

  const detailAbsen = await createDetailAbsen(absenId, mahasiswa.id);
  if (!detailAbsen) throw new ResponError(400, "Gagal membuat detail absen");

  console.log("isi", detailAbsen);

  const {
    id_absen,
    mahasiswa: { nama },
    waktu_diabsen,
  } = detailAbsen;

  console.log("ini ada idAbsen : ", id_absen || "tidak ada idAbsen");

  return { id_absen, nama, waktu_diabsen };
};

export { getAllAbsenByDosenId, getAllDetailAbsenByAbsenId, getDosenById };
export default {
  getAllAbsenByDosenId,
  getAllDetailAbsenByAbsenId,
  getDosenById,
  addDetailAbsen,
  getDosenByEmail,
  addAbsen,
};
