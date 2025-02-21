import { createContext, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

const PrivateRoute = () => {
    const { isAuthenticated, setIsAuthenticated } = useState(AuthContext)
    
    return  isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
    
}

export default PrivateRoute