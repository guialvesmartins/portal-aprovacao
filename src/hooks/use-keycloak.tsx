import { keycloakConf } from "@/auth/Keycloak";
import { create } from "zustand";

interface KeycloakStore {
  isAuthenticated: boolean;
  username: string | null;
  token: string | null;
  login: (token: string, username: string) => void;
  logout: () => void;
}

export const useKeycloakStore = create<KeycloakStore>((set) => ({
  isAuthenticated: false,
  username: null,
  token: null,
  login: (token, username) => set({ isAuthenticated: true, username, token }),
  logout: () => {
    set({ isAuthenticated: false, username: null, token: null });
    keycloakConf.logout();
  },
}));
