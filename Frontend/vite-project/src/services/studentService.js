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

const uploadProfileImg = async (mahasiswaId, imgUrl) => {
  console.log("url blob ", imgUrl);

  try {
    // Ambil Blob dari URL Blob
    const response = await fetch(imgUrl);
    const imgBlob = await response.blob();
    console.log("ini imgBlob ", imgBlob);

    // Buat FormData
    const formData = new FormData();
    formData.append("img", imgBlob, "profile.jpg"); // Nama file sesuai kebutuhan
    formData.append("mahasiswaId", mahasiswaId);

    console.log("ini gambar yang dikirim ", formData);

    // Kirim FormData ke server
    const uploadResponse = await axios.post(
      `http://localhost:3000/students/${mahasiswaId}/profile`,
      formData
      // FormData langsung dikirim tanpa dibungkus objek
    );

    console.log("Hasil upload:", uploadResponse.data);
    return uploadResponse.data.data; // Hasil dari server
  } catch (error) {
    console.error("Gagal upload gambar:", error);
    throw error;
  }
};

// const uploadProfileImg = async (mahasiswaId, img) => {
//   console.log("ini isi img yang akan diupload ", img);

//   const response = await axios.post(
//     `http://localhost:3000/students/${mahasiswaId}/profile`,
//     {
//       img,
//     }
//   );

//   return response.data.data;
// };

export { getAllDetailAbsenMahasiswaId, getMahasiswaById, uploadProfileImg };
