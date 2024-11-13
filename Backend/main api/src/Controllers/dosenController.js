import dosenService from "../Services/dosenService.js";

const getDosenById = async (req, res) => {
  const { lectureId } = req.params;

  try {
    const dosen = await dosenService.getDosenById(lectureId);
    return res.status(200).json({
      data: dosen,
    });
  } catch (err) {
    return res.status(err.status).json({
      error: {
        message: err.message,
      },
    });
  }
};

const getAllAbsenByDosenId = async (req, res) => {
  const { lectureId } = req.params;
  try {
    const absen = await dosenService.getAllAbsenByDosenId(lectureId);
    return res.status(200).json({
      data: absen,
    });
  } catch (err) {
    return res.status(err.status).json({
      error: {
        message: err.message,
      },
    });
  }
};

const getAllDetailAbsenByAbsenId = async (req, res) => {
  const { attendanceId } = req.params;

  try {
    const detailAbsen = await dosenService.getAllDetailAbsenByAbsenId(
      Number.parseInt(attendanceId)
    );
    return res.status(200).json({
      data: detailAbsen,
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      error: {
        message: err.message,
      },
    });
  }
};

const addDetailAbsen = async (req, res) => {
  const { attendanceId } = req.params;
  console.log("masuk ke fungsi addDetailAbsen Controller");

  console.log("ini attendanceId : " + attendanceId);

  const { image } = req.body;

  try {
    const detailAbsen = await dosenService.addDetailAbsen(
      Number.parseInt(attendanceId),
      image
    );
    console.log("isi detail absen : ", detailAbsen || "kosong detail absen");

    return res.status(200).json({
      data: detailAbsen,
    });
  } catch (err) {
    return res.status(err.status || 400).json({
      error: {
        message: err.message,
      },
    });
  }
};

const addAbsen = async (req, res) => {
  const { lectureId, courseName } = req.body;
  try {
    const absen = await dosenService.addAbsen(lectureId, courseName);
    return res.status(201).json({
      data: absen,
    });
  } catch (err) {
    return res.status(400).json({
      error: {
        message: err.message,
      },
    });
  }
};

export default {
  getAllAbsenByDosenId,
  getAllDetailAbsenByAbsenId,
  getDosenById,
  addDetailAbsen,
  addAbsen,
};
