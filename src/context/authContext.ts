import { createContext } from "react";

export interface AuthContextProps {
  isAuthenticated: boolean;
  username: string | null;
  token: string | null;
  login: (token: string, username: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);
