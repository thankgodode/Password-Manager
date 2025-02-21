import { createContext, useState,useEffect, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

import API from "../utils/api"


const PrivateRoute = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)

    // useEffect(() => {
    //     console.log("Dashboard page...")
    //     const checkAuth = async () => {
    //         try {
    //             const auth = await API.get("/dashboard");
    //             console.log("User authorization successfully")

    //             setIsAuthenticated(true)
    //         } catch (error) {
    //             console.log(error)
    //             localStorage.removeItem("token")
    //             setIsAuthenticated(false)
    //         }
    //     }

    //     checkAuth()
    // }, [isAuthenticated])
    
    return  <Outlet/>
}

export default PrivateRoute