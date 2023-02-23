import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage/index";
import ProductPage from "./pages/ProductPage/index";

import "./App.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/product">
          <Route path=":id" element={<ProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
