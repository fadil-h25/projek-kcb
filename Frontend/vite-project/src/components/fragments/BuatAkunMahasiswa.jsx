import React, { useEffect, useState } from "react";

import { Box, Heading, Button, Fieldset, Input, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";
import adminService from "../../services/adminService";

const BuatAkunMahasiswa = () => {
  const [nama, setNama] = useState(null);
  const [nim, setNim] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const addMahasiswa = async () => {
    try {
      const mahasiswa = await adminService.addMahasiswa(
        nama,
        nim,
        email,
        password
      );
      console.log("berhasil buat");
    } catch (error) {
      console.log("Gagal buat");
    }
  };

  useEffect(() => {}, []);

  return (
    <div>
      <Box backgroundColor={"white"} padding={"20px"}>
        <Heading mb={"20px"}>Akun Mahasiswa</Heading>
        <Fieldset.Root size="lg" maxW="md">
          <Fieldset.Content>
            <Field label="Nama Lengkap">
              <Input
                name="name"
                type="text"
                onChange={(e) => setNama(e.target.value)}
              />
            </Field>

            <Field label="Email ">
              <Input
                name="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>
            <Field label="Nim ">
              <Input
                name="nim"
                type="text"
                required={true}
                onChange={(e) => setNim(e.target.value)}
              />
            </Field>
            <Field label="Password">
              <Input
                name="password"
                type="password"
                required={true}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>
          </Fieldset.Content>

          <Button type="button" alignSelf="flex-start" onClick={addMahasiswa}>
            Buat Akun
          </Button>
        </Fieldset.Root>
      </Box>
    </div>
  );
};

export default BuatAkunMahasiswa;
