const headers = {
  credentials: "include",
  "Content-Type": "application/json",
}

export function signup(email, password) {
  return fetch("/api/signup", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers,
  }).then(res => res.json())
}

export function login(email, password) {
  return fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers,
  }).then(res => res.json())
}

export function getOS(appId, os) {
  return fetch(`/api/apps/${appId}?os=${os}`).then(res => res.json())
}

export function logout() {
  return fetch("/api/logout", {
    method: "POST",
    headers,
  })
}

export function pin(appId, shortcutId, isPinned) {
  return fetch("/api/pin", {
    method: "PATCH",
    body: JSON.stringify({ appId, shortcutId, isPinned }),
    headers,
  })
}