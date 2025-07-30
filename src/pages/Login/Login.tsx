import logo from "@/assets/fieg.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { portalAxios } from "@/lib/portalAxios";
import { LoginDTO } from "@/modules/login/LoginDTO";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginDTO): Promise<string> => {
      const formData = new URLSearchParams();
      formData.append("grant_type", "password");
      formData.append("username", data.username);
      formData.append("password", data.password);

      const response = await portalAxios.post("/api/oauth2/v1/token", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      return response.data.access_token;
    },
    onSuccess: (token) => {
      login(token, username);
    },
    onError: () => {
      const message = "Erro ao realizar login. Verifique suas credenciais.";

      setError(message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    mutation.mutate({ username, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <form
        onSubmit={handleSubmit}
        className="bg-primary shadow-lg rounded-xl p-8 space-y-6 w-full max-w-sm"
      >
        <img src={logo} alt="Fieg logo" className="mx-auto h-12" />
        <div>
          <label className="text-sm font-medium mb-1">Usuário</label>
          <Input value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Senha</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="text-destructive text-sm">{error}</div>}
        <Button
          variant="secondary"
          type="submit"
          className="w-full cursor-pointer"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </div>
  );
}
