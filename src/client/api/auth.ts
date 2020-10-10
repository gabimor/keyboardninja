import { sendApiRequest } from ".";
import { SignUpFormData } from "../pages/signup/SignupForm";

export async function signup(
  signUpForm: SignUpFormData
): Promise<string | undefined> {
  const response = await sendApiRequest("/auth/signup", {
    method: "POST",
    body: JSON.stringify(signUpForm),
  });

  const json = await response.json();

  if (json.success) {
    location.href = "/";
  } else {
    return json?.payload;
  }
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

  location.href = location.origin + location.pathname;
}
