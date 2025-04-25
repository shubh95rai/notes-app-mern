import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Modal from "react-modal";
import { Toaster } from "./components/ui/sonner";

Modal.setAppElement("#root");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Toaster
      richColors
      theme="light"
      position="top-center"
      offset={{ top: 5 }}
    />
  </StrictMode>
);
