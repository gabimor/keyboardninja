import { ToggleStarReturnType } from "@defs/misc";

const headers = {
  Accept: "application/json",
  Cache: "no-cache",
  "Content-Type": "application/json",
};

export const sendApiRequest: typeof fetch = async (url, options?) => {
  return fetch(url, { ...options, headers });
};

export async function toggleStar(
  appId: string,
  shortcutId: string
): ToggleStarReturnType {
  const response = await fetch("/api/star", {
    method: "POST",
    body: JSON.stringify({ appId, shortcutId }),
    headers,
  });

  return response.json();
}

export function getShareLink(appId: string, shortcutIds: string[]) {
  return fetch("/api/getlink", {
    method: "POST",
    body: JSON.stringify({ appId, shortcutIds }),
    headers,
    credentials: "include",
  });
}
