import React, { useEffect, useState } from "react";

import { Box, Heading, Button, Fieldset, Input, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";
import adminService from "../../services/adminService";

const BuatAkunDosen = () => {
  const [nama, setNama] = useState(null);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const addDosen = async () => {
    try {
      const dosen = await adminService.addDosen(nama, email, password);
      console.log("berhasil buat dosen");
    } catch (error) {
      console.log("Gagal buat dosen");
    }
  };

  return (
    <div>
      <Box backgroundColor={"white"} padding={"20px"}>
        <Heading mb={"20px"}>Akun Dosen</Heading>
        <Fieldset.Root size="lg" maxW="md">
          <Fieldset.Content>
            <Field label="Nama Lengkap">
              <Input name="name" onChange={(e) => setNama(e.target.value)} />
            </Field>

            <Field label="Email ">
              <Input
                name="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>

            <Field label="Password ">
              <Input
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>
          </Fieldset.Content>

          <Button type="button" alignSelf="flex-start" onClick={addDosen}>
            Buat Akun
          </Button>
        </Fieldset.Root>
      </Box>
    </div>
  );
};

export default BuatAkunDosen;
