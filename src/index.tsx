import React from "react";
import "regenerator-runtime";

import "@config/configureMobX";
import ReactDOM from "react-dom/client";
import { HashRouter, BrowserRouter } from "react-router-dom";

import App from "./App/index";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
