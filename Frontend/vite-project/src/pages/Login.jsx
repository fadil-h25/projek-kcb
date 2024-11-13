import {
  Button,
  Fieldset,
  Input,
  Stack,
  Container,
  Heading,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useContext, useState } from "react";
import { login, decodeToken } from "../services/authService.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth.jsx";

const Login = () => {
  const { authData, setAuthData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handler untuk mengelola perubahan input
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Handler untuk saat form disubmit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    try {
      // Panggil fungsi login dengan email dan password
      const response = await login(email, password);
      console.log("Login successful:", response);
      localStorage.setItem("token", response);

      const data = decodeToken(localStorage.getItem("token"));
      localStorage.setItem("id", data.id);
      localStorage.setItem("role", data.role);

      setAuthData({
        id: localStorage.getItem("id"),
        role: localStorage.getItem("role"),
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Container
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Fieldset.Root size="lg" maxW="md">
        <Stack>
          <Fieldset.Legend>
            <Heading fontSize={"3xl"} fontWeight={"bold"}>
              Welcome Back
            </Heading>
          </Fieldset.Legend>
          <Fieldset.HelperText>Please enter your details</Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Field label="Email address">
            <Input
              name="email"
              type="email"
              value={email}
              onChange={handleEmailChange} // Tambahkan onChange
            />
          </Field>
          <Field label="Password">
            <Input
              name="password"
              type="password"
              value={password}
              onChange={handlePasswordChange} // Tambahkan onChange
            />
          </Field>
        </Fieldset.Content>

        <Button
          bg={"blue.500"}
          type="submit"
          alignSelf="flex-start"
          color={"white"}
          width={"full"}
          onClick={handleSubmit} // Tambahkan handler saat tombol diklik
        >
          Sign in
        </Button>
      </Fieldset.Root>
    </Container>
  );
};

export default Login;
