import * as db from "./db"
import * as cache from "./cache"

export function encodeAppName(name) {
  return name.toLowerCase().replace(new RegExp(" ", "g"), "-")
}

export async function getApp(appId, user, os) {
  const app = await cache.getApp(appId)

  if (user) {
    const userShortcuts = await db.getUserShortcuts(user.id, app.id)

    for (const userShortcut of userShortcuts) {
      const shortcut = app.shortcuts.find(e => e.id === userShortcut.shortcutId)
      shortcut.isPinned = true
    } 
  }

  const currOSSectionIds = app.sections.filter(e => e.os === os).map(e => e.id)
  app.shortcuts = app.shortcuts.filter(e =>
    currOSSectionIds.includes(e.sectionId)
  )
  return app
}
