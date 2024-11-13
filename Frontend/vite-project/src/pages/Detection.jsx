import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Heading, Stack, Flex } from "@chakra-ui/react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const loadOpenCV = () => {
  const script = document.createElement("script");
  script.src = "https://docs.opencv.org/master/opencv.js";
  script.async = true;
  document.body.appendChild(script);
};

const AbsensiRealTime = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraAccessible, setIsCameraAccessible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState(""); // State untuk warna pesan
  const [mediaStream, setMediaStream] = useState(null);
  const { attendanceId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadOpenCV();

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        setMediaStream(stream);
        setIsCameraAccessible(true);

        const interval = setInterval(processVideo, 2000);

        return () => {
          clearInterval(interval);
          stopCamera();
        };
      })
      .catch((err) => {
        console.error("Gagal mengakses kamera: ", err);
      });
  }, []);

  const processVideo = () => {
    if (!window.cv || !isCameraAccessible) return;

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

  const captureImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png");

    if (!imageData) {
      return;
    }

    axios
      .post(
        `http://localhost:3000/lectures/attendances/${attendanceId}/details`,
        {
          image: imageData,
        }
      )
      .then((response) => {
        setAlertColor("green.500"); // Warna hijau untuk respons 200
        showAlert("Mahasiswa berhasil diabsen");
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 409) {
            setAlertColor("yellow.500"); // Warna kuning untuk respons 409
            showAlert("Mahasiswa sudah diabsen");
          } else if (
            error.response.status === 400 ||
            error.response.status === 404
          ) {
            setAlertColor("red.500"); // Warna merah untuk respons 400 atau 404
            showAlert("Mahasiswa gagal diabsen");
          }
        } else {
          setAlertColor("red.500");
          showAlert("Terjadi kesalahan jaringan.");
        }
      });
  };

  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage("");
    }, 3000);
  };

  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleBack = () => {
    stopCamera();
    navigate(-1);
  };

  return (
    <Stack align="center" spacing={1} mt={8}>
      {alertMessage && (
        <Box
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          mb={4}
          bg={alertColor} // Menggunakan warna sesuai kode respons
          color="white"
          width="100%"
          textAlign="center"
        >
          {alertMessage}
        </Box>
      )}
      <Flex gap={"20px"} width="100%" direction="row">
        <Box height={"100%"} flex="70%" border={"1px solid black"}>
          <video ref={videoRef} width="100%" height="350" autoPlay />
        </Box>
        <Flex flex="30%" direction="column" justifyContent={"start"}>
          <Heading as="h1" size="lg">
            Absensi Real-Time
          </Heading>
          <Button
            width={"100%"}
            onClick={captureImage}
            colorScheme="blue"
            mb={4}
          >
            Ambil Gambar
          </Button>
          <Button onClick={handleBack} colorScheme="red">
            Kembali
          </Button>
        </Flex>
      </Flex>
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
