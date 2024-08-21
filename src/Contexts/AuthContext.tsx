// import React, { createContext, useState, useContext, useEffect } from "react";
// import { AlertState } from "./AlertContext";

// // Auth Context
// interface User {
//     name: string;
//     email: string;
//     mobile: string;
// }

// interface AuthContextValue {
//     user: User | null;
//     login: (userData: User) => void;
//     logout: () => void;
//     isLogin: boolean;
//     loading: boolean;
//     alert: AlertState | null;
//     setAlert: React.Dispatch<React.SetStateAction<AlertState | null>>;
// }

// const AuthContext = createContext<AuthContextValue>({
//     user: null,
//     login: () => { },
//     logout: () => { },
//     isLogin: false,
//     loading: true,
//     alert: null,
//     setAlert: () => { },
// });

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const [user, setUser] = useState<User | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [alert, setAlert] = useState<AlertState | null>(null);

//     useEffect(() => {
//         const storedUser = localStorage.getItem("user");
//         if (storedUser) {
//             setUser(JSON.parse(storedUser));
//         }
//         setLoading(false);
//     }, []);

//     const login = (userData: User) => {
//         setUser(userData);
//         localStorage.setItem("user", JSON.stringify(userData));
//     };

//     const logout = () => {
//         setUser(null);
//         localStorage.removeItem("user");
//     };

//     return (
//         <AuthContext.Provider
//             value={{
//                 user,
//                 login,
//                 logout,
//                 isLogin: !!user,
//                 loading,
//                 alert,
//                 setAlert,
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// };



import React, { createContext, useState, useContext, useEffect } from "react";
import { AlertState, useAlert } from "./AlertContext";

// Auth Context
interface User {
    name: string;
    email: string;
    mobile: string;
}

interface AuthContextValue {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    isLogin: boolean;
    loading: boolean;
    alert: AlertState | null;
    setAlert: React.Dispatch<React.SetStateAction<AlertState | null>>;
}

const AuthContext = createContext<AuthContextValue>({
    user: null,
    login: () => { },
    logout: () => { },
    isLogin: false,
    loading: true,
    alert: null,
    setAlert: () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { setAlert } = useAlert();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isLogin: !!user,
                loading,
                alert: null, // Make sure to pass the alert state from the AlertContext
                setAlert,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};