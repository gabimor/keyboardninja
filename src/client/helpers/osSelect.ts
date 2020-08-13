export function init() {
  if (!document.cookie.includes("os=")) {
    setSelectedOS(getClientOS())
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
  document.cookie = "os=" + os + "; expires=Fri, 31 Dec 9999 23:59:59 GMT"
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
