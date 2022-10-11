import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { theme } from "./utils/constants";
import { GlobalStyles } from "./styles/GlobalStyles";
import "./styles/index.scss";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles></GlobalStyles>
      <BrowserRouter>
        <App />
        <ToastContainer></ToastContainer>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
