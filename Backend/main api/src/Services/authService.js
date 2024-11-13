import jwt from "jsonwebtoken";
import { ResponError } from "../Errors/responError.js";
// import mahasiswaService from "./mahasiswaService.js";
// import dosenService from "./dosenService.js";
import { findMahasiswaByEmail } from "../Repositories/mahasiswaRepo.js";
import { findDosenByEmail } from "../Repositories/dosenRepo.js";

const createJwt = (id, role) => {
  const token = jwt.sign(
    {
      id,
      role,
    },
    "122",
    {
      expiresIn: "1h",
    }
  );

  if (!token) throw new ResponError(400, "Gagal membuat token");

  return token;
};

const login = async (email, password) => {
  const dosen = await findDosenByEmail(email);
  const mahasiswa = await findMahasiswaByEmail(email);

  console.log("ini dosen", dosen);
  console.log("ini mahasiswa", mahasiswa);

  if (dosen && dosen.password == password) {
    console.log("Masuk ke dosen");

    return createJwt(dosen.id, "dosen");
  } else if (mahasiswa && mahasiswa.password == password) {
    console.log("Masuk ke mahasiswa");
    return createJwt(mahasiswa.id, "mahasiswa");
  } else {
    console.log("error ada di servce");

    throw new ResponError(404, "User tidak ditemukan");
  }
};

export default { login };
