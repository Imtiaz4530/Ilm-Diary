import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import App from "./App.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <App />
            <ToastContainer
              position="top-right"
              autoClose={2500}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              pauseOnHover
              theme="dark"
            />
          </AuthContextProvider>
        </QueryClientProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
