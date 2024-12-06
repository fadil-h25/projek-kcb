import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { HStack, Stack, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Fieldset, Input } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";
import BuatAkunMahasiswa from "./BuatAkunMahasiswa";
import BuatAkunDosen from "./BuatAkunDosen";

const AdminDashboard = () => {
  // State untuk melacak tombol yang sedang aktif
  const [activeButton, setActiveButton] = useState(null);

  // Fungsi untuk menangani klik tombol
  const handleClick = (buttonId) => {
    setActiveButton(buttonId); // Mengatur tombol yang aktif
  };
  return (
    <Flex>
      <Box
        width={"200px"}
        display="flex"
        flexDirection="column"
        pe={"10px"}
        height={"100vh"}
      >
        <Button
          justifyContent={"start"}
          mt={"10px"}
          backgroundColor={activeButton === 1 ? "blue.500" : "white"} // Jika tombol 1 aktif, beri warna blue
          style={{
            color: activeButton === 1 ? "#fff" : "#dad7cd", // Mengubah warna teks jika aktif
          }}
          onClick={() => handleClick(1)} // Set tombol 1 aktif
        >
          Dashboard
        </Button>

        <Button
          justifyContent={"start"}
          mt={"10px"}
          backgroundColor={activeButton === 2 ? "blue.500" : "white"} // Jika tombol 2 aktif, beri warna blue
          style={{
            color: activeButton === 2 ? "#fff" : "#dad7cd", // Mengubah warna teks jika aktif
          }}
          onClick={() => handleClick(2)} // Set tombol 2 aktif
        >
          Akun Mahasiswa
        </Button>

        <Button
          justifyContent={"start"}
          mt={"10px"}
          backgroundColor={activeButton === 3 ? "blue.500" : "white"} // Jika tombol 3 aktif, beri warna blue
          style={{
            color: activeButton === 3 ? "#fff" : "#dad7cd", // Mengubah warna teks jika aktif
          }}
          onClick={() => handleClick(3)} // Set tombol 3 aktif
        >
          Akun Dosen
        </Button>
      </Box>
      <Box padding={"10px"} backgroundColor={"#f8f9fa"} width={"vw"}>
        {activeButton == 3 && <BuatAkunDosen />}
        {activeButton == 2 && <BuatAkunMahasiswa />}
      </Box>
    </Flex>
  );
};

export default AdminDashboard;
