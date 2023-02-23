import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import Register from "./component/register/Register";
import Login from "./component/login/Login";

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Register />} />
        <Route path="/Login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default Routers;
