import axios from "axios";

const getAllDetailAbsenMahasiswaId = async (mahasiswaId) => {
  const response = await axios.get(
    `http://localhost:3000/students/${mahasiswaId}/details`
  );
  console.log(response.data);

  return response.data;
};

const getMahasiswaById = async (mahasiswaId) => {
  console.log("id mahasiswa yag akan dipakai : ", mahasiswaId);

  const response = await axios.get(
    `http://localhost:3000/students/${mahasiswaId}`
  );

  console.log("hasil fetc mahasiswaById : ", response.data);

  return response.data.data;
};

export { getAllDetailAbsenMahasiswaId, getMahasiswaById };
