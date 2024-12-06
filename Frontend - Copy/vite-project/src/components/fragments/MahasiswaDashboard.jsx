import { For, Stack, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAllDetailAbsenMahasiswaId } from "../../services/studentService.js";

const MahasiswaDashboard = ({ id }) => {
  const [detailAbsen, setDetailAbsen] = useState([]);

  useEffect(() => {
    const fetchDetailAbsen = async (mahasiswaId) => {
      try {
        const detailAbsen = await getAllDetailAbsenMahasiswaId(mahasiswaId);

        setDetailAbsen(detailAbsen.data);
      } catch (error) {
        console.log("error coy di mahasiswa Dashboard");
      }
    };

    fetchDetailAbsen(id);
  }, []);

  useEffect(() => {
    console.log("isi detail absen ", detailAbsen);
  }, [detailAbsen]);
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
                    Nama Dosen
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
                          {item.id_absen}
                        </Table.Cell>
                        <Table.Cell borderBottom="1px solid gray.200">
                          {item.mata_kuliah}
                        </Table.Cell>
                        <Table.Cell borderBottom="1px solid gray.200">
                          {item.nama}
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

export default MahasiswaDashboard;
