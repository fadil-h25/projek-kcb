import axios from "axios";

const addDosen = async (nama, email, password) => {
  const newDosen = await axios.post("http://localhost:3000/admin/lectures", {
    nama,
    email,
    password,
  });
  return newDosen.data.data;
};
const addMahasiswa = async (nama, nim, email, password) => {
  const newMahasiswa = await axios.post(
    "http://localhost:3000/admin/students",
    {
      nama,
      nim,
      email,
      password,
    }
  );
  return newMahasiswa.data.data;
};

const getAdminById = async (id) => {
  const admin = await axios.get(`http://localhost:3000/admin/${id}`);

  return admin.data.data;
};
export default { addMahasiswa, addDosen, getAdminById };
