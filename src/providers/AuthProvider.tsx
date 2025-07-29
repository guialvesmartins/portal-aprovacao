import { AuthContext } from "@/context/authContext";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedToken = localStorage.getItem("auth-token");
    const storedUser = localStorage.getItem("auth-user");
    if (storedToken) {
      setToken(storedToken);
      setUsername(storedUser);
    } else if (location.pathname !== "/login") {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!token && location.pathname !== "/login") {
      navigate("/login");
    }
  }, [token, location.pathname, navigate]);

  const login = (tok: string, user: string) => {
    setToken(tok);
    setUsername(user);
    localStorage.setItem("auth-token", tok);
    localStorage.setItem("auth-user", user);
    navigate("/");
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
    localStorage.removeItem("auth-token");
    localStorage.removeItem("auth-user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!token, username, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
