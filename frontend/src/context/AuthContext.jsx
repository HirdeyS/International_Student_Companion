import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });

    const [token, setToken] = useState(() => localStorage.getItem("token") || "");
    const isAuthenticated = !!token;
    const navigate = useNavigate();

    function login(userData, tokenValue) {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", tokenValue);

        setUser(userData);
        setToken(tokenValue);
    }

    function logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        setUser(null);
        setToken("");
        navigate("/")
    }

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}