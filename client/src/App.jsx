import { Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Home from "./Pages/home/Home";
import Navbar from "./Components/navbar/Navbar";
import ViewIlm from "./Pages/viewIlm/ViewIlm";
import { fetchIlmRecords } from "./api/ilmApi";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["ilm"],
    queryFn: fetchIlmRecords,
    staleTime: 1000 * 60,
  });

  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home records={data} loading={isLoading} />} />
        <Route
          path="/view/:id"
          element={<ViewIlm records={data} loading={isLoading} />}
        />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
