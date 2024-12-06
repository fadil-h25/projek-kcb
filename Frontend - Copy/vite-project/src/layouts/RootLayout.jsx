import { Outlet } from "react-router-dom";
import { Container } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Container bg={"slate.50"}>
        <Outlet />
      </Container>
    </>
  );
};

export default RootLayout;
