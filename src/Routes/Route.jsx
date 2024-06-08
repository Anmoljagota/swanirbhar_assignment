import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import SingleCourse from "../Pages/SingleCourse";
import CheckAuth from "../components/CheckAuth";
const AllRoutes = () => {
  //all routes
  return (
    <Routes>
      <Route
        path="/"
        element={
          <CheckAuth>
            <Home />
          </CheckAuth>
        }
      ></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/coursedetails/:id" element={<SingleCourse />}></Route>
    </Routes>
  );
};

export default AllRoutes;
