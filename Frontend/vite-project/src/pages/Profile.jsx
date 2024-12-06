import {
  Stack,
  Box,
  Image,
  Heading,
  Text,
  Button,
  useDisclosure,
  PopoverCloseTrigger,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Input } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Flex } from "@chakra-ui/react";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getMahasiswaById, uploadProfileImg } from "../services/studentService";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [profileImage, setProfileImage] = useState();
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imgUpload, setImgUpload] = useState();
  const fileInputRef = useRef(null);
  const { studentId } = useParams();
  const [student, setStudent] = useState({});

  const defaultImg =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const img =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  const handleImgSave = async () => {
    setImgUpload(preview);
    try {
      await uploadProfileImg(studentId, imgUpload);
      console.log("berhasil upload gambar");
    } catch (error) {
      console.log("gagal upload gambar : ", error);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const handleFileSelect = (event) => {
    const files = event.target.files;
    if (files.length) {
      const file = files[0];
      console.log("isi file sebelum jadu bloob ", file);

      const previewUrl = URL.createObjectURL(file);
      console.log(previewUrl);

      setPreview(previewUrl);
    }
  };
  const handleBrowseClik = () => {
    fileInputRef.current.click();
  };

  // const uploadImg = async() =>{
  //   try {
  //     const result = uploadProfileImg()
  //   } catch (error) {

  //   }
  // }

  useEffect(() => {
    console.log("ini isi preview : ", preview);
  }, [preview]);

  useEffect(() => {
    const getStudentById = async () => {
      try {
        const student1 = await getMahasiswaById(studentId);
        setStudent(student1);

        if (student1) {
          let imageUrl = `http://res.cloudinary.com/dj25fwmvp/image/upload/v1732967223/dataset_kcb/${student1.nim}.jpg`;
          console.log("isi gamba user ", imageUrl);

          setProfileImage(imageUrl);
        } else {
          setProfileImage(null);
        }

        console.log("ini profile mahasiswa : ", student1);
      } catch (error) {
        console.log("gagal ambil student ", error);
      }
    };

    getStudentById();
  }, [studentId, setStudent]);

  // useEffect(() => {
  //   if (student) {
  //     let imageUrl = `http://res.cloudinary.com/dj25fwmvp/image/upload/v1732967223/dataset/${student.id}.jpg`;
  //     setProfileImage(imageUrl);
  //   }
  // }, [student, setProfileImage]);

  return (
    <>
      <Button mt={"10px"}>Kembali</Button>
      <Stack mt={"10"} direction="row" height={""} bor>
        <Box me={"20px"} height={"auto"}>
          {student.id ? (
            <Image
              height={"400px"}
              src={profileImage}
              borderRadius={"md"}
              objectFit={"cover"}
            />
          ) : (
            <Image
              height={"400px"}
              src={defaultImg}
              borderRadius={"md"}
              objectFit={"cover"}
            />
          )}
        </Box>

        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          height={"300px"}
          p={"10px"}
          gap={"10px"}
        >
          {/* Teks di bagian atas */}
          <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
            <Field label="Nama Lengkap">
              <Input
                readOnly
                focusRing={"none"}
                focusBorderColor="transparent"
                _focus={{ boxShadow: "none" }}
                focusVisibleRing={"none"}
                placeholder=""
                value={student != null ? student.nama : "Kosong"}
              />
            </Field>
            <Field label="NIM">
              <Input
                readOnly
                focusRing={"none"}
                focusBorderColor="transparent"
                _focus={{ boxShadow: "none" }}
                focusVisibleRing={"none"}
                placeholder=""
                value={student != null ? student.nim : "Kosong"}
              />
            </Field>
            <Field label="Email">
              <Input
                readOnly
                focusRing={"none"}
                focusBorderColor="transparent"
                _focus={{ boxShadow: "none" }}
                focusVisibleRing={"none"}
                placeholder=""
                value={student != null ? student.email : "Kosong"}
              />
            </Field>
            <Field label="Status">
              <Input
                readOnly
                focusRing={"none"}
                focusBorderColor="transparent"
                _focus={{ boxShadow: "none" }}
                focusVisibleRing={"none"}
                placeholder=""
                value={"Mahasiswa"}
              />
            </Field>
          </Box>

          {/* Tombol di bagian bawah */}
          <Box display={"flex"} gap={"10px"}>
            <PopoverRoot
              closeOnInteractOutside={false}
              // modal={true}
              flip={true}
              size={"lg"}
              // placement={"top"}
              // positioning={{ offset: { crossAxis: -100, mainAxis: 0 } }}
              placement={"top"} // Popover muncul di atas elemen pemicu
              positioning={{
                offset: { mainAxis: -90, crossAxis: -300 }, // Geser lebih dekat hingga menutupi
              }}
            >
              <PopoverTrigger asChild>
                <Button colorPalette={"blue"} size="md">
                  Edit Photo Profile
                </Button>
              </PopoverTrigger>
              <PopoverContent width={"auto"}>
                <PopoverBody>
                  <Flex flexDirection={"column"}>
                    <Box
                      height={"400px"}
                      width={"400px"}
                      border={preview ? "" : "1px solid black"}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      {preview == null ? (
                        <Box margin={"auto"} textAlign={"center"}>
                          <Text>Drag and Drop image here</Text>
                          <Text>or</Text>
                          <Button onClick={handleBrowseClik}>Browse</Button>
                          <Input
                            ref={fileInputRef}
                            type="file"
                            style={{ display: "none" }} // Sembunyikan elemen ini
                            onChange={handleFileSelect}
                          ></Input>
                        </Box>
                      ) : (
                        <Image src={preview} height={"400px"}></Image>
                      )}
                    </Box>
                    <Box mt={"10px"} width={"full"}>
                      <Box
                        display="flex"
                        justifyContent={"space-between"}
                        gap="10px"
                        width={"full"}
                      >
                        <PopoverCloseTrigger
                          width={"full"}
                          gap={"10px"}
                          display={"flex"}
                        >
                          <Button
                            flexGrow={1}
                            colorPalette={"green"}
                            onClick={handleImgSave}
                          >
                            Simpan
                          </Button>
                        </PopoverCloseTrigger>
                        <Button
                          colorPalette={"red"}
                          onClick={() => setPreview(null)}
                          flexGrow={1}
                        >
                          Hapus
                        </Button>

                        <PopoverCloseTrigger>
                          <Button colorPalette={"blue"} flexGrow={1}>
                            Batal
                          </Button>
                        </PopoverCloseTrigger>
                      </Box>
                    </Box>
                  </Flex>
                </PopoverBody>
              </PopoverContent>
            </PopoverRoot>
          </Box>
        </Box>
      </Stack>
    </>
  );
};

export default Profile;
