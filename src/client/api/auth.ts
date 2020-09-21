import { sendApiRequest } from ".";

function storeJwt(jwt: string) {
  localStorage.jwt = jwt;

  localStorage.user = atob(jwt.split(".")[1]);

  return JSON.parse(localStorage.user);
}

export async function signup(email: string, password: string) {
  const res = await sendApiRequest("/auth/signup", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  location.href = "/";

  return storeJwt(await res.text());
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

  return storeJwt(await res.text());
}

export function logout() {
  localStorage.removeItem("jwt");
  localStorage.removeItem("user");

  return sendApiRequest("/auth/logout", {
    method: "POST",
  });
}
