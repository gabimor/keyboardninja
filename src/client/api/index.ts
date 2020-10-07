import { ToggleStarReturnType } from "@src/types/misc";

const headers = {
  Accept: "application/json",
  Cache: "no-cache",
  "Content-Type": "application/json",
};

export const sendApiRequest: typeof fetch = async (url, options?) => {
  return fetch(url, { ...options, headers });
};

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

export function getOS(appId: string, os: string) {
  return fetch(`/api/apps/${appId}?os=${os}`).then((res) => res.json());
}

export async function toggleStar(
  appId: string,
  shortcutId: string
): ToggleStarReturnType {
  console.log(appId, shortcutId);

  const response = await fetch("/api/star", {
    method: "POST",
    body: JSON.stringify({ appId, shortcutId }),
    headers,
  });

  console.log(response);

  return { stars: 0, isStarred: true };
}

export function getLink(appId: string, shortcutIds: string[]) {
  return fetch("/api/getlink", {
    method: "POST",
    body: JSON.stringify({ appId, shortcutIds }),
    headers,
    credentials: "include",
  });
}
