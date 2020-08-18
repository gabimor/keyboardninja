export function encodeAppName(name: string) {
  return name.toLowerCase().replace(new RegExp(" ", "g"), "-");
}
