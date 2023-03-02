import React from "react";

import "@config/configureMobX";
import ReactDOM from "react-dom/client";

import App from "./App/index";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
