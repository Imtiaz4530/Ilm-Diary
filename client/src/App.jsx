import { Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Home from "./Pages/home/Home";
import Navbar from "./Components/navbar/Navbar";
import ViewIlm from "./Pages/viewIlm/ViewIlm";
import { fetchIlmRecords } from "./api/ilmApi";
import Loading from "./Components/loading/Loading";

const App = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["ilm"],
    queryFn: fetchIlmRecords,
    staleTime: 1000 * 60,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home records={data} />} />
        <Route path="/view/:id" element={<ViewIlm records={data} />} />
      </Routes>
    </>
  );
};

export default App;
