import axios from "axios";

const login = async (email, password) => {
  const response = await axios.post("http://localhost:3000/login", {
    email,
    password,
  });

  return response.data.data;
};

export { login };
