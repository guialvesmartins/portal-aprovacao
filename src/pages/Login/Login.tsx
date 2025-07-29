import { useState } from "react";
import { portalAxios } from "@/lib/portalAxios";
import { useAuth } from "@/hooks/use-auth";

export function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await portalAxios.post("/oauth2/token", {
        username,
        password,
      });
      const token = data.access_token as string;
      login(token, username);
    } catch {
      setError("Credenciais inválidas");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
        <div>
          <label className="block mb-1">Usuário</label>
          <input
            className="border p-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">Senha</label>
          <input
            type="password"
            className="border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button type="submit" className="border px-4 py-2 rounded bg-primary text-white">
          Entrar
        </button>
      </form>
    </div>
  );
}
