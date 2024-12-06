import { createContext, useEffect, useState } from "react";

// Membuat context untuk otentikasi
const AuthContext = createContext();

// Komponen provider untuk mengelola state otentikasi
const AuthContextProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    id: localStorage.getItem("id") || null,
    role: localStorage.getItem("role"),
  }); // State untuk menyimpan data otentikasi

  useEffect(() => {
    console.log("isi auth Data : ", authData);
  }, [authData]);

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children} {/* Membungkus children agar bisa mengakses context */}
    </AuthContext.Provider>
  );
};

// Ekspor context dan provider
export { AuthContext, AuthContextProvider };
