import { Navigate, Route, Routes } from "react-router-dom";
import { Signin } from "../pages";
import { Signup } from "../pages";
import React from 'react'

export const AllRoutes = () => {
  return (
    <>
    <Routes>
        {/* <Route path="/" element={ <Navigate to="/home"/> } /> */}
        <Route path="/" element={ <Signup/> } />

    </Routes>
    
    
    </>
  )
}
