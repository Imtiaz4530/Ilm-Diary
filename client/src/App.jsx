import { Route, Routes } from "react-router-dom";

import Home from "./Pages/home/Home";
import Navbar from "./Components/navbar/Navbar";
import ViewIlm from "./Pages/viewIlm/ViewIlm";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view/:id" element={<ViewIlm />} />
      </Routes>
    </>
  );
};

export default App;
