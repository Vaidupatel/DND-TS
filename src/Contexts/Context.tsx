import React, { createContext, useState, useContext, useEffect } from "react";

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
}

// Alert Context
export interface AlertState {
    title: string;
    message: string;
    duration: number;
    variant: string;
}

interface AppContextValue extends AuthContextValue {
    alert: AlertState | null;
    setAlert: React.Dispatch<React.SetStateAction<AlertState | null>>;
}

const AppContext = createContext<AppContextValue | null>(null);

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [alert, setAlert] = useState<AlertState | null>(null);

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
        <AppContext.Provider
            value={{
                user,
                login,
                logout,
                isLogin: !!user,
                loading,
                alert,
                setAlert,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};