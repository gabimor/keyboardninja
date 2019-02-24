export function encodeAppName(name) {
  return name.toLowerCase().replace(new RegExp(" ", "g"), "-")
}

export function upperFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function getClientOS() {
  const isWin = navigator.platform.toLowerCase().includes("win")
  return isWin ? "win" : "osx"
}

export function lightenDarkenColor(color, amount) {
  let usePound = false

  if (color[0] === "#") {
    color = color.slice(1)
    usePound = true
  }

  let num = parseInt(color, 16)

  let r = (num >> 16) + amount

  if (r > 255) r = 255
  else if (r < 0) r = 0

  let b = ((num >> 8) & 0x00ff) + amount

  if (b > 255) b = 255
  else if (b < 0) b = 0

  let g = (num & 0x0000ff) + amount

  if (g > 255) g = 255
  else if (g < 0) g = 0

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16)
}