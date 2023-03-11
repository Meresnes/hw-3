import React from "react";

import "@config/configureMobX";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "regenerator-runtime";
import App from "./App/index";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
