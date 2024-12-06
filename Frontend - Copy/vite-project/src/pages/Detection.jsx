import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Heading, Stack } from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router-dom";

// Import OpenCV library asynchronously
const loadOpenCV = () => {
  const script = document.createElement("script");
  script.src = "https://docs.opencv.org/master/opencv.js";
  script.async = true;
  document.body.appendChild(script);
};

const AbsensiRealTime = () => {
  const { attendanceId } = useParams();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  console.log("isi attendanceId : ", attendanceId);

  const [isCameraAccessible, setIsCameraAccessible] = useState(false);

  useEffect(() => {
    loadOpenCV(); // Load OpenCV library

    // Mengakses kamera
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        setIsCameraAccessible(true);

        // Mulai memproses video setiap 2 detik
        const interval = setInterval(processVideo, 2000);

        return () => clearInterval(interval); // Cleanup saat komponen dilepas
      })
      .catch((err) => {
        console.error("Gagal mengakses kamera: ", err);
      });
  }, []);

  const processVideo = () => {
    if (!window.cv || !isCameraAccessible) return; // Cek jika OpenCV belum siap

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const mat = window.cv.matFromImageData(imageData);

    window.cv.cvtColor(mat, mat, window.cv.COLOR_RGBA2GRAY);
    context.putImageData(
      new ImageData(new Uint8ClampedArray(mat.data), mat.cols, mat.rows),
      0,
      0
    );
    mat.delete();
  };

  const captureImage = async () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png");

    if (!imageData) {
      return;
    }

    console.log("attendanceId sebelum dikirm ke axios : ", attendanceId);

    // Kirim gambar ke server menggunakan Axios
    await axios
      .post(
        `http://localhost:3000/lectures/attendances/${attendanceId}/details`,
        {
          image: imageData,
        }
      )
      .then((response) => {
        console.log("Response dari server:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Stack align="center" spacing={4} mt={8}>
      <Heading as="h1" size="lg">
        Absensi Real-Time
      </Heading>
      <Box>
        <video ref={videoRef} width="640" height="480" autoPlay />
      </Box>
      <Button onClick={captureImage} colorScheme="blue">
        Ambil Gambar
      </Button>
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{ display: "none" }}
      />
    </Stack>
  );
};

export default AbsensiRealTime;
