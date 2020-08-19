export function encodeAppName(appName: string) {
  return appName.toLowerCase().replace(new RegExp(" ", "g"), "-");
}

export function upperFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function copyToClipboard(text: string) {
  const dummy = document.createElement("input");
  document.body.appendChild(dummy);
  dummy.setAttribute("value", text);
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
