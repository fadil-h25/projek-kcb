import { For, Stack, Table, Heading, Box, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAllDetailAbsenByAbsenId } from "../services/dosenService";
import { useParams, useNavigate } from "react-router-dom";
const DetailAbsen = () => {
  const navigate = useNavigate();
  const { attendanceId } = useParams();
  const [detailAbsen, setDetailAbsen] = useState([]);

  console.log("attendanceId : ", attendanceId);

  const handleDetection = () => {
    navigate("detection");
  };

  useEffect(() => {
    const fetchDetailAbsenByAbsenId = async (absenId) => {
      try {
        const response = await getAllDetailAbsenByAbsenId(absenId);
        setDetailAbsen(response);
        return response;
      } catch (error) {
        console.log("Error cuy");
      }
    };

    fetchDetailAbsenByAbsenId(attendanceId);
  }, []);

  useEffect(() => {
    console.log("ini isi detail absen : ", detailAbsen);
  }, [detailAbsen]);
  return (
    <div>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        marginTop={"10"}
      >
        <Heading marginTop={"10"}>Halo</Heading>

        <Button
          onClick={() => {
            handleDetection();
          }}
          bg={"green.500"}
          color={"white"}
        >
          Deteksi Wajah
        </Button>
      </Box>
      <Stack gap="10" marginTop="2">
        <For each={["lg"]}>
          {(size) => (
            <Table.Root
              key={size}
              size={size}
              borderRadius="10px"
              overflow="hidden"
              border="1px solid gray.200"
              showColumnBorder
            >
              <Table.Header bg="blue.500">
                <Table.Row bg="blue.500">
                  <Table.ColumnHeader
                    fontSize="lg"
                    fontWeight="bold"
                    color="white"
                  >
                    Kode Absen
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    fontSize="lg"
                    fontWeight="bold"
                    color="white"
                  >
                    Mata Kuliah
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    fontSize="lg"
                    fontWeight="bold"
                    color="white"
                  >
                    Nama Mahasiswa
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    fontSize="lg"
                    fontWeight="bold"
                    color="white"
                  >
                    Nim
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    fontSize="lg"
                    fontWeight="bold"
                    color="white"
                  >
                    Tanggal Diabsen
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    fontSize="lg"
                    fontWeight="bold"
                    color="white"
                  >
                    Waktu Diabsen
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {detailAbsen.length > 0 &&
                  detailAbsen.map((item) => {
                    const date = new Date(item.waktu_diabsen);

                    return (
                      <Table.Row key={item.id}>
                        <Table.Cell borderBottom="1px solid gray.200">
                          {item.id_absen || "nul"}
                        </Table.Cell>
                        <Table.Cell borderBottom="1px solid gray.200">
                          {item.mata_kuliah}
                        </Table.Cell>
                        <Table.Cell borderBottom="1px solid gray.200">
                          {item.nama}
                        </Table.Cell>
                        <Table.Cell borderBottom="1px solid gray.200">
                          {item.nim}
                        </Table.Cell>
                        <Table.Cell borderBottom="1px solid gray.200">
                          {`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`}
                        </Table.Cell>
                        <Table.Cell borderBottom="1px solid gray.200">
                          {`${date.getHours()}:${date.getMinutes()}`}
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
              </Table.Body>
            </Table.Root>
          )}
        </For>
      </Stack>
    </div>
  );
};

export default DetailAbsen;
