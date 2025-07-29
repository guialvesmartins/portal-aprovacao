import { keycloakConf } from "@/auth/Keycloak";
import { initKeycloak } from "@/auth/Secured";
import { AuthContext } from "@/context/keycloakContext";
import { useKeycloakStore } from "@/hooks/use-keycloak";
import { useEffect, useState } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, login, logout } = useKeycloakStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initKeycloak()
      .then((authenticated) => {
        if (authenticated && keycloakConf.token) {
          login(keycloakConf.token.toString(), keycloakConf.tokenParsed?.name || "");
        }
        setTimeout(() => setLoading(false), 1000); // Aguarda 3 segundos antes de remover o loading
      })
      .catch(() => setTimeout(() => setLoading(false), 1000));
  }, [login]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen w-screen flex-col space-y-4">
        <div
          className="inline-block h-16 w-16 animate-spin rounded-full border-6 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
        <span className="text-primary font-semibold">Carregando os dados!</span>
      </div>
    );

  return (
    <AuthContext.Provider value={{ isAuthenticated, username: login.name, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
