import { sendApiRequest } from ".";

export async function signup(email: string, password: string) {
  const res = await sendApiRequest("/auth/signup", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  location.href = "/";
}

export async function login(email: string, password: string) {
  const res = await sendApiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  location.href = "/";
}

export function logout() {
  document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";

  location.href = "/";
}
