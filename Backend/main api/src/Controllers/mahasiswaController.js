import mahasiswaService from "../Services/mahasiswaService.js";
import { v2 as cloudinary } from "cloudinary";

const getAllDetailAbsenById = async (req, res) => {
  const { studentId } = req.params;

  try {
    const detailAbsen = await mahasiswaService.getAllDetailAbsenById(studentId);
    return res.status(200).json({
      data: detailAbsen,
    });
  } catch (err) {
    return res.status(err.status).json({
      error: {
        message: err.message,
      },
    });
  }
};

const getMahasiswaById = async (req, res) => {
  const { studentId } = req.params;

  try {
    const mahasiswa = await mahasiswaService.getMahasiswaById(studentId);
    return res.status(200).json({
      data: mahasiswa,
    });
  } catch (err) {
    return res.status(err.status).json({
      error: {
        message: err.message,
      },
    });
  }
};

const uploadProfileImg = async (req, res) => {
  const { studentId } = req.params;
  const { message } = req.body;
  const file = req.file;
  if (!file) {
    return res.status(400).send({ message: "Tidak ada file yang diupload" });
  }
  console.log("ini gambar yang akan dikirim :  ", file);
  console.log("ini isi message : ", message);

  try {
    await mahasiswaService.uploadProfileImg(studentId, file.path);
    return res.status(200).json({
      data: {
        message: "berhasil upload gambar",
      },
    });
  } catch (err) {
    return res.status(err.status).json({
      error: {
        message: err.message,
      },
    });
  }
};

export default { getAllDetailAbsenById, getMahasiswaById, uploadProfileImg };
