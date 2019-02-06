export function getShortcutTooltip() {
  return !!localStorage.getItem("tooltips.shortcut")
}

export function setShortcutTooltip() {
  localStorage.set("tooltips.shortcut", "true")
}

export function loadOS() {
  return localStorage.getItem("os")
}

export function saveOS(os) {
  localStorage.setItem("os", os)
}
