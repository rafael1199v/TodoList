import { createContext, useContext, useEffect, useState } from "react";
import SupabaseClient from "../services/SupabaseClient";

const AuthContext = createContext(undefined);

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    const getSession = async () => {

        try {
            const supabase = new SupabaseClient();
            const { data, error } = await supabase.auth.getSession();

            if(error) {
                console.error(error);
                throw new Error("Hubo un error la obtener la sesión del usuario");
            }

            setSession(data.session);
        }
        catch(error) {
            console.error(error);
            setSession(null);
        }
        finally {
            setLoading(false);
        }   


    }


    useEffect(() => {
        getSession();
    }, []);
    
    return (
        <AuthContext.Provider value={{ session, setSession, loading }}>
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