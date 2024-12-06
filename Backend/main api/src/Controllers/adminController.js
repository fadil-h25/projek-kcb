import adminService from "../Services/adminService.js";

const getAllItems = async (req, res) => {
  try {
    const items = await adminService.countItems();
    return res.status(200).json({
      data: items,
    });
  } catch (err) {
    return res.status(err.status).json({
      error: {
        message: err.message,
      },
    });
  }
};

const getAllDosen = async (req, res) => {
  try {
    const allAbsen = await adminService.getAllDosen();
    return res.status(200).json({
      data: allAbsen,
    });
  } catch (err) {
    res.status(err.status).json({
      message: err.message,
    });
  }
};

const getAllMahasiswa = async (req, res) => {
  try {
    const allmahasiswa = await adminService.getAllStudent();
    return res.status(200).json({
      data: allmahasiswa,
    });
  } catch (err) {
    res.status(err.status).json({
      message: err.message,
    });
  }
};

const addDosen = async (req, res) => {
  const { nama, email, password } = req.body;
  try {
    const dosen = await adminService.addDosen(nama, email, password);
    return res.status(200).json({
      data: dosen,
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      error: {
        message: err.message,
      },
    });
  }
};
const addMahasiswa = async (req, res) => {
  const { nama, nim, email, password } = req.body;

  try {
    const mahasiswa = await adminService.addMahasiswa(
      nama,
      nim,
      email,
      password
    );
    return res.status(200).json({
      data: mahasiswa,
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      error: {
        message: err.message,
      },
    });
  }
};

const getAdmin = async (req, res) => {
  const { adminId } = req.params;
  try {
    const admin = await adminService.getAdmin(adminId);
    return res.status(200).json({
      data: admin,
    });
  } catch (err) {
    return res.status(err.status).json({
      error: {
        message: err.message,
      },
    });
  }
};
export {
  getAllItems,
  getAllDosen,
  getAllMahasiswa,
  addMahasiswa,
  addDosen,
  getAdmin,
};
