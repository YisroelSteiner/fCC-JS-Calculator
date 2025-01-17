import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.scss";
import Calculator from "./Calculator.jsx"

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>
);