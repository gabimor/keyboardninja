export function encodeAppName(name) {
  return name.toLowerCase().replace(new RegExp(" ", "g"), "-")
}

export function getAppIdByName(urlName, apps) {
  return apps.find(item => encodeAppName(item.name) === urlName).id
}

export function upperFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function getClientOS() {
  const isWin = navigator.platform.toLowerCase().includes("win")
  return isWin ? "win" : "osx"
}