export function encodeAppName(name) {
  return name.toLowerCase().replace(new RegExp(" ", "g"), "-")
}