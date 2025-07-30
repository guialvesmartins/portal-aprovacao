import { AxiosInstance } from "axios";
import { LoginDTO } from "./LoginDTO";

export interface FetchLoginParams {
  idAgenda: number;
}

export function fetchLogin(
  data: LoginDTO,
  axios: AxiosInstance
): Promise<{ access_token: string }> {
  const formData = new URLSearchParams();
  formData.append("grant_type", "password");
  formData.append("username", data.username);
  formData.append("password", data.password);

  return axios
    .post("/api/oauth2/v1/token", formData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
    .then((res) => res.data);
}
