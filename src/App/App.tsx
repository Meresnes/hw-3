import React from "react";

import { useQueryParamsStoreInit } from "@store/RootStore/hooks/useQueryParamsStoreInit";
import { Route, Routes } from "react-router-dom";

import MainPage from "./pages/MainPage/index";
import ProductPage from "./pages/ProductPage/index";

import "./App.scss";

const App = () => {
  useQueryParamsStoreInit();

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/product" >
          <Route path=":id" element={<ProductPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
