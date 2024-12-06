import { useEffect, useState } from "react";
import { getAllAbsenByDosenId } from "../../services/dosenService";
import { For, Stack, Table, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const DosenDashboard = ({ id }) => {
  const navigate = useNavigate();
  const [absen, setAbsen] = useState([]);

  const handleDetails = (absenId) => {
    console.log("ada kok ", absenId);

    navigate(`attendances/${absenId}/details`);
  };

  useEffect(() => {
    const fetchAbsenByDosenId = async (id) => {
      console.log("masuk le fungsi fetchABsenByDosenId");

      try {
        const response = await getAllAbsenByDosenId(id);
        setAbsen(response);
      } catch (error) {
        console.log("error cuy di dosen dashbaord");
      }
    };

    fetchAbsenByDosenId(id);
  }, []);

  useEffect(() => {
    console.log("isi daftar absen dosen1 : ", absen);
  }, [absen]);
  return (
    <div>
      <Stack gap="10" marginTop="14">
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
                    Tanggal Dibuat
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    fontSize="lg"
                    fontWeight="bold"
                    color="white"
                  >
                    Waktu Dibuat
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    fontSize="lg"
                    fontWeight="bold"
                    color="white"
                  >
                    Aksi
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {absen.length > 0 &&
                  absen.map((item) => {
                    const date = new Date(item.waktu_dibuat);

                    return (
                      <Table.Row key={item.id}>
                        <Table.Cell borderBottom="1px solid gray.200">
                          {item.id}
                        </Table.Cell>
                        <Table.Cell borderBottom="1px solid gray.200">
                          {item.mata_kuliah}
                        </Table.Cell>

                        <Table.Cell borderBottom="1px solid gray.200">
                          {`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`}
                        </Table.Cell>
                        <Table.Cell borderBottom="1px solid gray.200">
                          {`${date.getHours()}:${date.getMinutes()}`}
                        </Table.Cell>
                        <Table.Cell
                          display={"flex"}
                          gap={"10px"}
                          borderBottom="1px solid gray.200"
                        >
                          <Button
                            onClick={() => handleDetails(item.id)}
                            bg={"green.500"}
                            borderRadius={"5px"}
                          >
                            Details
                          </Button>
                          <Button bg={"red.500"} borderRadius={"5px"}>
                            Delete
                          </Button>
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

export default DosenDashboard;
