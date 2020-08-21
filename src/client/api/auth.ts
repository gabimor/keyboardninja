import { sendApiRequest } from ".";

export function signup(email: string, password: string) {
  return sendApiRequest("/auth/signup", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => res.json());
}

export function login(email: string, password: string) {
  return sendApiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => res.json());
}

export function logout() {
  return sendApiRequest("/auth/logout", {
    method: "POST",
  });
}
