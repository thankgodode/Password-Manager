import { useState, useContext, createContext } from "react";

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [profile, setProfile] = useState("")

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated,
            profile,
            setProfile
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider