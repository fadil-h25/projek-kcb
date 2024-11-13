import authService from "../Services/authService.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await authService.login(email, password);
    return res.status(200).json({
      data: token,
    });
  } catch (err) {
    console.log("error ditangkap");

    return res.status(err.status).json({
      error: {
        messaage: err.message,
      },
    });
  }
};

const test = async (req, res) => {
  res.status(200).json({
    data: "Berhasil di auth",
  });
};

export default { login, test };
