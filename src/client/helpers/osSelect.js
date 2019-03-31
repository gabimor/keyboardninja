export function init() {
  if (!document.cookie.includes("os=")) {
    document.cookie = "os=" + getClientOS()
  }
}

export function getSelectedOS() {
  let selectedOS = getCookie("os")
  if (!selectedOS) {
    selectedOS = getClientOS()
  }

  return selectedOS
}

export function setSelectedOS(os) {
  document.cookie = "os=" + os
}

function getClientOS() {
  const isWin = navigator.platform.toLowerCase().includes("win")
  return isWin ? "win" : "mac"
}

function getCookie(name) {
  const value = "; " + document.cookie
  const parts = value.split("; " + name + "=")
  if (parts.length === 2)
    return parts
      .pop()
      .split(";")
      .shift()
}
