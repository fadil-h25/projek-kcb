import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getMahasiswaById } from "../services/studentService";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Auth";
import { getDosenById } from "../services/dosenService";
import { Avatar } from "@/components/ui/avatar";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import adminService from "../services/adminService";

const Navbar = () => {
  const { authData } = useContext(AuthContext);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSelect = (value) => {
    console.log("Masuk di handleSelect");

    if (value === "logout") {
      handleLogout();
    }
  };

  const handleProfile = () => {
    navigate(`dashboard/${authData.id}/profile`);
  };
  useEffect(() => {
    const fetchMahasiswaById = async (id) => {
      try {
        const response = await getMahasiswaById(id);
        console.log("ini isi response : ", response);
        setUser(response);

        return response;
      } catch (error) {
        console.log("gagal oy di mahasiswa");
      }
    };
    const fetchDosenId = async (id) => {
      console.log("Masuk ke fungsi fetchDOsenByID");

      try {
        const response = await getDosenById(id);
        console.log("ini isi response : ", response);
        setUser(response);

        return response;
      } catch (error) {
        console.log("gagal oy di Navbar dosen");
      }
    };

    const fetchAdmin = async (id) => {
      console.log("Masuk ke fungsi fetchAdminById");
      try {
        const response = await adminService.getAdminById(id);
        console.log("ini isi response : ", response);
        setUser(response);

        return response;
      } catch (error) {
        console.log("gagal oy di Navbar admin ", error.message);
      }
    };

    if (authData.role == "admin") {
      fetchAdmin(authData.id);
    } else if (authData.role == "dosen") {
      fetchDosenId(authData.id);
    } else if (authData.role == "mahasiswa") {
      fetchMahasiswaById(authData.id);
    }
  }, []);

  useEffect(() => {
    console.log("isi user saat ini : ", user);
    if (user) console.log("nama user saat ini : ", user.nama);
  }, [user]);
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems="center"
      bg={"blue.500"}
      padding="4"
    >
      {/* Bagian Kiri */}
      <Box>
        <Text fontSize="xl" color="white" fontWeight="bold">
          Absensi
        </Text>
      </Box>

      {/* Bagian Kanan */}
      <Flex alignItems="center">
        <Box textAlign="right" color="white" marginRight="4">
          <Text fontWeight="bold">{(user && user.nama) || "111"}</Text>
          <Text fontSize="sm">
            {(user && user.nim) || (user && user.email)}
          </Text>
        </Box>
        <MenuRoot>
          <MenuTrigger asChild>
            <Button variant="plain" outline={"none"} width={"0"}>
              <Avatar
                name="Segun Adebayo"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              />
            </Button>
          </MenuTrigger>
          <MenuContent>
            {authData.role == "mahasiswa" && (
              <MenuItem mb={"10px"} onClick={handleProfile} value="logout">
                Profil
              </MenuItem>
            )}
            <MenuItem onClick={handleLogout} value="logout">
              Logout
            </MenuItem>
          </MenuContent>
        </MenuRoot>
      </Flex>
    </Flex>
  );
};

export default Navbar;
