import { Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Home from "./Pages/home/Home";
import Navbar from "./Components/navbar/Navbar";
import ViewIlm from "./Pages/viewIlm/ViewIlm";
import { fetchIlmRecords } from "./api/ilmApi";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import GuestRoute from "./Components/GuestRoute/GuestRoute";
import NotFoundRoute from "./Components/NotFoundRoute/NotFoundRoute";

const App = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["ilm"],
    queryFn: fetchIlmRecords,
    staleTime: 1000 * 60,
  });

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home records={data} loading={isLoading} />} />
        <Route
          path="/view/:id"
          element={<ViewIlm records={data} loading={isLoading} />}
        />

        <Route
          path="/signup"
          element={
            <GuestRoute>
              <Signup />
            </GuestRoute>
          }
        />

        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundRoute />} />
      </Routes>
    </>
  );
};

export default App;
