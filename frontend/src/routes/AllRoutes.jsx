import { Navigate, Route, Routes } from "react-router-dom";
import { Signin } from "../pages";
import { Signup } from "../pages";
import React from 'react'
import { Home } from "../pages/Home";
import { Watchlist } from "../pages/Watchlist";

export const AllRoutes = () => {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={ <Navigate to="/home"/> } /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Signin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </>
  )
}
