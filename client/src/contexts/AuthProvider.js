import { useState, useContext, createContext } from "react";

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState("")

    return (
        <AuthContext.Provider value={{
            userId,
            setUserId
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider