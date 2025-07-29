import { useAuth } from "@/hooks/use-auth";
import { portalAxios } from "@/lib/portalAxios";
import logo from "@/assets/fieg.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append("grant_type", "password");
      formData.append("username", username);
      formData.append("password", password);

      const { data } = await portalAxios.post("/api/oauth2/v1/token", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const token = data.access_token as string;
      login(token, username);
    } catch {
      setError("Credenciais inválidas");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-card-background shadow-lg rounded-xl p-8 space-y-6 w-full max-w-sm"
      >
        <img src={logo} alt="Fieg logo" className="mx-auto h-12" />
        <div>
          <label className="block text-sm font-medium mb-1">Usuário</label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </form>
    </div>
  );
}
