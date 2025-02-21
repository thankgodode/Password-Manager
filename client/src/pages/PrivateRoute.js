import { createContext, useState,useEffect, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

import API from "../utils/api";

const PrivateRoute = ({children}) => {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)
    
    useEffect(() => {
      console.log("checking...")
    const checkAuth = async () => {
    try {
      const auth = await API.get("/dashboard")
      setIsAuthenticated(true)
      
    } catch (error) {
      console.log(error)
      return
    }
  }
      
  checkAuth()
  }, [])

    return isAuthenticated ? {children} : <Navigate to="/login"/>
}

export default PrivateRoute