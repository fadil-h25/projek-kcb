import axios from "axios";

const getAllDetailAbsenMahasiswaId = async (mahasiswaId) => {
  const response = await axios.get(
    `http://localhost:3000/students/${mahasiswaId}/details`
  );
  console.log(response.data);

  return response.data;
};

export { getAllDetailAbsenMahasiswaId };
