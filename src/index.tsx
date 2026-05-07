import "./index.css";
import React from "react";
import { render } from "react-dom";
import { App } from "./App";
import { ThemeProvider } from "./context/ThemeContext";

render(
  <ThemeProvider>
    <App />
  </ThemeProvider>, 
  document.getElementById("root")
);