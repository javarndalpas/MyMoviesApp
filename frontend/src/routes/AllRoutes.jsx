import { Navigate, Route, Routes } from "react-router-dom";
import { Signin } from "../pages";
import { Signup } from "../pages";
import React, { useState } from 'react'
import { Home } from "../pages/Home";
import { Watchlist } from "../pages/Watchlist";
import { RefreshHandler } from "../components/RefreshHandler";
import { Search } from "../pages/Search";

export const AllRoutes = () => {
  const [isAuthanticated,setIsAuthanticated] = useState(false);

  const  PrivateRoute =({ element })=>{
    return isAuthanticated ? element : <Navigate to="/"/>
  }
  return (
    <>
      <RefreshHandler setIsAuthanticated={setIsAuthanticated} />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Signin />} />
        <Route path="/home" element={ <PrivateRoute element={<Home/>}/>} />
        <Route path="/search/:query" element={ <PrivateRoute element={<Search/>}/>} />
        <Route path="/watchlist" element={ <PrivateRoute element={<Watchlist/>}/>} />
      </Routes>
    </>
  )
}
