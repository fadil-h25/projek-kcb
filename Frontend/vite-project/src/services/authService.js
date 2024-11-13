import axios from "axios";
import { decodeJwt } from "jose";

const login = async (email, password) => {
  const response = await axios.post("http://localhost:3000/login", {
    email,
    password,
  });

  return response.data.data;
};

const decodeToken = (token) => {
  const data = decodeJwt(token);
  console.log("isi data auth : ", data);
  return data;
};

export { login, decodeToken };
