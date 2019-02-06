export function wasTooltipShown(tooltip) {
  return !!localStorage.getItem("tooltips." + tooltip)
}

export function setTooltipShown(tooltip) {
  localStorage.setItem("tooltips." + tooltip, "true")
}

export function loadOS() {
  return localStorage.getItem("os")
}

export function saveOS(os) {
  localStorage.setItem("os", os)
}
