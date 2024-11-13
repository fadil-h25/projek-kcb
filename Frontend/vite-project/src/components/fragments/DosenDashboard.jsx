import { useEffect, useState } from "react";
import {
  addAbsenByDosenId,
  getAllAbsenByDosenId,
} from "../../services/dosenService";
import { For, Stack, Table, Button, Fieldset, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Field } from "@/components/ui/field";

const DosenDashboard = ({ id }) => {
  const navigate = useNavigate();
  const [absen, setAbsen] = useState([]);
  const [mataKuliah, setMataKuliah] = useState(""); // State untuk input mata kuliah

  const handleDetails = (absenId) => {
    console.log("ada kok ", absenId);
    navigate(`attendances/${absenId}/details`);
  };

  useEffect(() => {
    const fetchAbsenByDosenId = async (id) => {
      console.log("masuk le fungsi fetchAbsenByDosenId");

      try {
        const response = await getAllAbsenByDosenId(id);
        setAbsen(response);
      } catch (error) {
        console.log("error cuy di dosen dashboard");
      }
    };

    fetchAbsenByDosenId(id);
  }, [id]);

  useEffect(() => {
    console.log("isi daftar absen dosen1 : ", absen);
  }, [absen]);

  const handleAddAbsen = async () => {
    if (!mataKuliah) return; // Cek jika input mata kuliah kosong

    try {
      const newAbsen = await addAbsenByDosenId(id, mataKuliah);
      setAbsen((prev) => [...prev, newAbsen]); // Tambah absen baru ke state
      setMataKuliah(""); // Reset input setelah berhasil ditambahkan
    } catch (error) {
      console.error("Gagal menambahkan absen:", error);
    }
  };

  return (
    <div>
      <Fieldset.Root
        display="flex"
        marginTop={"10px"}
        flexDirection="row"
        alignItems="center"
        marginLeft={"auto"}
        size="lg"
        maxW="md"
      >
        <Button
          onClick={handleAddAbsen} // Panggil fungsi untuk menambahkan absen
          type="button" // Ganti ke type="button" untuk menghindari submit form
          alignSelf="flex-end"
          mr={"10px"}
        >
          Buat Absen
        </Button>
        <Fieldset.Content flex="1">
          <Input
            name="mataKuliah"
            placeholder="Mata kuliah"
            value={mataKuliah}
            onChange={(e) => setMataKuliah(e.target.value)} // Update state saat input berubah
          />
        </Fieldset.Content>
      </Fieldset.Root>
      <Stack gap="10" marginTop="5">
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
                          {`${date.getFullYear()}-${
                            date.getMonth() + 1
                          }-${date.getDate()}`}
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
