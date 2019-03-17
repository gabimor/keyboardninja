function encodeAppName(name) {
  return name.toLowerCase().replace(new RegExp(" ", "g"), "-")
}

module.exports = {
  encodeAppName,
}
