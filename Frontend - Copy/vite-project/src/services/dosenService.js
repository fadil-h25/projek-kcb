import axios from "axios";

const getAllAbsenByDosenId = async (dosenId) => {
  const response = await axios.get(
    `http://localhost:3000/lectures/${dosenId}/attendances`
  );
  console.log("isi daftar absen dengan data : ", response.data);
  console.log("isi daftar absen dengan data data : ", response.data.data);

  return response.data.data;
};

const getDosenById = async (id) => {
  console.log("id dosen yang akan digunakan : ", id);

  const response = await axios.get(`http://localhost:3000/lectures/${id}`);
  //   console.log("isi dosen : ", response.data);

  return response.data.data;
};

const getAllDetailAbsenByAbsenId = async (absenId) => {
  console.log("ini absenId yang akan digunakan : ", absenId);

  const response = await axios.get(
    `http://localhost:3000/lectures/attendances/${absenId}/details`
  );
  // http://localhost:3000/lectures/attendances/1/details

  console.log("isi detailAbsen : ", response.data.data);
  return response.data.data;
};

export { getAllAbsenByDosenId, getDosenById, getAllDetailAbsenByAbsenId };
