import * as db from "./db"
import * as cache from "./cache"
import { App } from "./model"

export function encodeAppName(name) {
  return name.toLowerCase().replace(new RegExp(" ", "g"), "-")
}

export async function getAppsBasicData() {
  const apps = await App.find().lean()  

  // const apps = await db.getApps()
  // const sections = await cache.getAllSections()

  const results = {}
  for (const currApp of apps) {
    results[encodeAppName(currApp.name)] = currApp
  }

  return results
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

  app.sections = app.sections.filter(e => e.os === os)
  const currOSSectionIds = app.sections.map(e => e.id)
  app.shortcuts = app.shortcuts.filter(e =>
    currOSSectionIds.includes(e.sectionId)
  )
  return app
}
