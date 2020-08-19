const headers = {
  Accept: "application/json",
  Cache: "no-cache",
  "Content-Type": "application/json",
};

export function signup(email: string, password: string) {
  return fetch("/api/signup", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers,
  }).then((res) => res.json());
}

export async function contactUs(name: string, email: string, message: string) {
  try {
    const res = await fetch("/api/contactus", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        message,
      }),
      headers,
    });

    if (res.status !== 200) throw new Error();
  } catch (e) {
    throw e;
  }
}

export function login(email: string, password: string) {
  return fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers,
  }).then((res) => res.json());
}

export function getOS(appId: string, os: string) {
  return fetch(`/api/apps/${appId}?os=${os}`).then((res) => res.json());
}

export function logout() {
  return fetch("/api/logout", {
    method: "POST",
    headers,
  });
}

export function pin(appId: string, shortcutId: string, isPinned: boolean) {
  return fetch("/api/pin", {
    method: "PATCH",
    body: JSON.stringify({ appId, shortcutId, isPinned }),
    headers,
  });
}

export function getLink(appId: string, shortcutIds: string[]) {
  return fetch("/api/getlink", {
    method: "POST",
    body: JSON.stringify({ appId, shortcutIds }),
    headers,
    credentials: "include",
  });
}
