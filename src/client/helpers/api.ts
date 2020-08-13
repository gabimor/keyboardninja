const headers = {
  // credentials: "include",
  Accept: "application/json",
  Cache: "no-cache",
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

export async function contactUs(name, email, message) {
  try {
    const res = await fetch("/api/contactus", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        message,
      }),
      headers,
    })

    if (res.status != 200) throw new Error()
  } catch (e) {
    throw e
  }
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

export function getLink(appId, shortcutIds) {
  return fetch("/api/getlink", {
    method: "POST",
    body: JSON.stringify({ appId, shortcutIds }),
    headers,
    credentials: "include",
  })
}
