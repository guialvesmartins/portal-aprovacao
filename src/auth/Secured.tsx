import { useKeycloakStore } from "@/hooks/use-keycloak";
import { keycloakConf } from "./Keycloak";

export const initKeycloak = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    keycloakConf
      .init({ onLoad: "login-required", checkLoginIframe: false })
      .then((authenticated) => {
        if (authenticated) {
          updateToken();

          const token = keycloakConf.token || "";
          const username = keycloakConf.tokenParsed?.name || "";

          useKeycloakStore.getState().login(token, username);
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((err) => reject(err));
  });
};

export const updateToken = () => {
  keycloakConf.onTokenExpired = () => {
    keycloakConf
      .updateToken(30)
      .then((refreshed) => {
        if (refreshed) {
          useKeycloakStore
            .getState()
            .login(keycloakConf.token || "", keycloakConf.tokenParsed?.preferred_username || "");
        }
      })
      .catch(() => {
        keycloakConf.logout();
        useKeycloakStore.getState().logout();
      });
  };
};

export const login = () => keycloakConf.login();
export const logout = () => {
  keycloakConf.logout();
  useKeycloakStore.getState().logout();
};

export const getToken = () => useKeycloakStore.getState().token;
export const getUsername = () => useKeycloakStore.getState().username;
