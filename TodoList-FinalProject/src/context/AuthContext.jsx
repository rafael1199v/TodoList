import { createContext, useContext, useState } from "react";


const AuthContext = createContext(undefined);

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    
    return (
        <AuthContext.Provider value={{ session, setSession }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const auth = useContext(AuthContext);

    if(auth === undefined)
        throw new Error("El proveedor no está siendo utilizado");
    
    return auth;
}