import mahasiswaService from "../Services/mahasiswaService.js";

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

export default { getAllDetailAbsenById, getMahasiswaById };
