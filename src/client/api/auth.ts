import { sendApiRequest } from ".";

export async function signup(
  email: string,
  password: string
): Promise<string | undefined> {
  const response = await sendApiRequest("/auth/signup", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const json = await response.json();

  return json?.payload;
}

export async function login(email: string, password: string): Promise<number> {
  const response = await sendApiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return response.status;
}

export function logout() {
  document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";

  location.href = "/";
}
