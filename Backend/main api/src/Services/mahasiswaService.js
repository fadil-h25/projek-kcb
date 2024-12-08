import { ResponError } from "../Errors/responError.js";
import { findManyDetailAbsenByMahasiswaId } from "../Repositories/detailAbsen.js";
import {
  findMahasiswaByEmail,
  findMahasiswaById,
} from "../Repositories/mahasiswaRepo.js";
import { v2 as cloudinary } from "cloudinary";

import fs from "fs"; // Untuk menghapus file sementara
import path from "path";

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

const uploadProfileImg = async (id, file) => {
  const mahasiswa = await findMahasiswaById(id);

  if (!mahasiswa) throw new ResponError(404, "Mahasiswa not found");

  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    // Upload an image
    const uploadResult = await cloudinary.uploader.upload(file, {
      public_id: mahasiswa.nim,
      name: mahasiswa.nim,
      folder: "dataset_kcb",
    });

    console.log("Upload result:", uploadResult);
    fs.unlinkSync(file);
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

// const uploadProfileImg = async (id, file) => {
//   if (!id || !file) {
//     throw new ResponError(400, "ID atau file tidak boleh kosong");
//   }

//   const mahasiswa = await findMahasiswaById(id);

//   if (!mahasiswa) throw new ResponError(404, "Mahasiswa not found");

//   try {
//     cloudinary.config({
//       cloud_name: "dj25fwmvp",
//       api_key: "537579951436223",
//       api_secret: "dB9VZ369AFHc5fQ9nIGQffIouxk",
//     });

//     const filePath = path.resolve(file); // Pastikan path file benar
//     const uploadResult = await cloudinary.uploader.upload(filePath, {
//       public_id: mahasiswa.nim,
//       folder: "dataset",
//     });

//     console.log("Upload result:", uploadResult);

//     try {
//       fs.unlinkSync(filePath);
//       console.log("File removed successfully");
//     } catch (err) {
//       console.error("Error removing file:", err.message);
//     }
//   } catch (error) {
//     console.error("Error uploading image:", error.message);
//     throw new ResponError(500, "Upload gagal");
//   }
// };

export default {
  getAllDetailAbsenById,
  getMahasiswaByEmail,
  getMahasiswaById,
  uploadProfileImg,
};
