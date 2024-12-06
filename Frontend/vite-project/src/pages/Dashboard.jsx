import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Auth.jsx";
import MahasiswaDashboard from "../components/fragments/mahasiswaDashboard.jsx";
import DosenDashboard from "../components/fragments/DosenDashboard.jsx";
import AdminDashboard from "../components/fragments/adminDashboard.jsx";

const Demo = () => {
  const { authData } = useContext(AuthContext);

  return (
    <>
      {authData && authData.role == "admin" && (
        <AdminDashboard></AdminDashboard>
      )}
      {authData && authData.role == "dosen" && (
        <DosenDashboard id={authData.id} />
      )}
      {authData && authData.role == "mahasiswa" && (
        <MahasiswaDashboard id={authData.id} />
      )}
    </>

    // <Stack gap="10" marginTop="14">
    //   <For each={["lg"]}>
    //     {(size) => (
    //       <Table.Root
    //         key={size}
    //         size={size}
    //         borderRadius="10px"
    //         overflow="hidden"
    //         border="1px solid gray.200"
    //         showColumnBorder
    //       >
    //         <Table.Header bg="blue.500">
    //           <Table.Row bg="blue.500">
    //             <Table.ColumnHeader
    //               fontSize="lg"
    //               fontWeight="bold"
    //               color="white"
    //             >
    //               Kode Absen
    //             </Table.ColumnHeader>
    //             <Table.ColumnHeader
    //               fontSize="lg"
    //               fontWeight="bold"
    //               color="white"
    //             >
    //               Mata Kuliah
    //             </Table.ColumnHeader>
    //             <Table.ColumnHeader
    //               fontSize="lg"
    //               fontWeight="bold"
    //               color="white"
    //             >
    //               Nama Dosen
    //             </Table.ColumnHeader>
    //             <Table.ColumnHeader
    //               fontSize="lg"
    //               fontWeight="bold"
    //               color="white"
    //             >
    //               Tanggal Diabsen
    //             </Table.ColumnHeader>
    //             <Table.ColumnHeader
    //               fontSize="lg"
    //               fontWeight="bold"
    //               color="white"
    //             >
    //               Waktu Diabsen
    //             </Table.ColumnHeader>
    //           </Table.Row>
    //         </Table.Header>
    //         <Table.Body>
    //           {detailAbsen.length > 0 &&
    //             detailAbsen.map((item) => {
    //               const date = new Date(item.waktu_diabsen);

    //               return (
    //                 <Table.Row key={item.id}>
    //                   <Table.Cell borderBottom="1px solid gray.200">
    //                     {item.id_absen}
    //                   </Table.Cell>
    //                   <Table.Cell borderBottom="1px solid gray.200">
    //                     {item.mata_kuliah}
    //                   </Table.Cell>
    //                   <Table.Cell borderBottom="1px solid gray.200">
    //                     {item.nama}
    //                   </Table.Cell>
    //                   <Table.Cell borderBottom="1px solid gray.200">
    //                     {`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`}
    //                   </Table.Cell>
    //                   <Table.Cell borderBottom="1px solid gray.200">
    //                     {`${date.getHours()}:${date.getMinutes()}`}
    //                   </Table.Cell>
    //                 </Table.Row>
    //               );
    //             })}
    //         </Table.Body>
    //       </Table.Root>
    //     )}
    //   </For>
    // </Stack>
  );
};

export default Demo;
