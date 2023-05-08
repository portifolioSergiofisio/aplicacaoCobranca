import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "react-query";
import { QueryClient } from "react-query";

const queryCliente = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={queryCliente}>
      <App />
      <ToastContainer limit={1} />
    </QueryClientProvider>
  </BrowserRouter>
);
