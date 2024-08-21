// import React, { createContext, useState, useContext } from "react";

// // Alert Context
// export interface AlertState {
//     title: string;
//     message: string;
//     duration: number;
//     variant: string;
// }

// const AlertContext = createContext<{
//     alert: AlertState | null;
//     setAlert: React.Dispatch<React.SetStateAction<AlertState | null>>;
// } | null>(null);

// export const useAlert = () => {
//     const context = useContext(AlertContext);
//     if (!context) {
//         throw new Error("useAlert must be used within an AlertProvider");
//     }
//     return context;
// };

// export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
//     const [alert, setAlert] = useState<AlertState | null>(null);

//     return (
//         <AlertContext.Provider value={{ alert, setAlert }}>
//             {children}
//         </AlertContext.Provider>
//     );
// };


import React, { createContext, useState, useContext } from "react";
import { useApp } from "./AuthContext";

// Alert Context
export interface AlertState {
    title: string;
    message: string;
    duration: number;
    variant: string;
}

const AlertContext = createContext<{
    alert: AlertState | null;
    setAlert: React.Dispatch<React.SetStateAction<AlertState | null>>;
} | null>(null);

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error("useAlert must be used within an AlertProvider");
    }
    return context;
};

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
    const [alert, setAlert] = useState<AlertState | null>(null);
    const { isLogin, loading } = useApp();

    return (
        <AlertContext.Provider value={{ alert, setAlert, isLogin, loading }}>
            {children}
        </AlertContext.Provider>
    );
};