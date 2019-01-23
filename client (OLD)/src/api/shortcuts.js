export function saveShortcut(appId, categoryId, action, keys, comment) {
  return fetch('/shortcut', { 
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({
        appId,
        categoryId,
        action,
        keys,
        comment
      })
    }
  )
}

export function getAppShortcuts(appId) {
  return fetch(`/app/${appId}`, { 
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}