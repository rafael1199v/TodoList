import { createContext, useContext, useState } from "react";
import Alert from "../components/Alert";

const AlertContext = createContext(undefined);

export const AlertContextProvider = ({ children }) => {
    const [alert, setAlert] = useState(null);

    const showAlert = (title, message, type = "danger") => {
        setAlert({ title, message, type });
        setTimeout(() => {
            setAlert(null);
        }, 3000);
    };

    const hideAlert = () => {
        setAlert(null);
    };

    return (
        <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
            {children}
            {alert && (
                <div className='fixed bottom-4 left-1/2 transform -translate-x-1/3 z-50'>
                    <Alert title={alert.title} message={alert.message} type={alert.type}/>
                </div>
            )}
        </AlertContext.Provider>
    );
};

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (context === undefined) {
        throw new Error("useAlert debe ser usado dentro de AlertContextProvider");
    }
    return context;
};
