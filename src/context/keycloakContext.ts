import { createContext } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  username: string | null;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);
