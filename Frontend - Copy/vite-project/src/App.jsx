import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import { AuthContextProvider } from "./context/Auth";
import DetailAbsen from "./pages/DetailAbsen";
import AbsensiRealTime from "./pages/Detection";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<RootLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route
            path="dashboard/attendances/:attendanceId/details"
            element={<DetailAbsen />}
          />
          <Route
            path="dashboard/attendances/:attendanceId/details/detection"
            element={<AbsensiRealTime />}
          />
        </Route>
      </>
      // Pindahkan AuthContextProvider di luar Routes
    )
  );

  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
