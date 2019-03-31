import NodeCache from "node-cache"
import * as db from "./db"

const cache = new NodeCache()

export async function getAppCategories() {
  // TODO: restore caching
  // let appCategories = cache.get("appCategories")
  let appCategories = undefined
  if (!appCategories) {
    appCategories = await db.getAppCategories()
    cache.set("appCategories", appCategories)
  }
  return appCategories
}

export function get(key) {
  return cache.get(key)
}

export function set(key, page) {
  cache.set(key, page)
}

export function getApps() {
  let apps = cache.get("apps")

  if (!apps) {
    apps = db.getApps()
    cache.set("apps", apps)
  }
  return apps
}

export function getAllSections() {
  let sections = cache.get("sections")

  if (!sections) {
    sections = db.getAllSections()
    cache.set("sections", sections)
  }
  return sections
}

export function getAllShortcuts() {
  let shortcuts = cache.get("shortcuts")

  if (!shortcuts) {
    shortcuts = db.getAllShortcuts()
    cache.set("shortcuts", shortcuts)
  }
  return shortcuts
}

export async function getApp(appId) {
  const cacheKey = "app-" + appId
  let app = cache.get(cacheKey)

  if (!app) {
    app = await db.getApp(appId)

    app.sections = (await getAllSections()).filter(e => e.appId === appId)
    const allShortcuts = await getAllShortcuts()

    for (const currShortcut of await db.getShortcutsPins(appId)) {
      allShortcuts.find(e => e.id === currShortcut.id).pins = currShortcut.pins
    }

    const sectionIds = app.sections.map(e => e.id)
    app.shortcuts = allShortcuts.filter(e => sectionIds.includes(e.sectionId))

    cache.set(cacheKey, app)
  }

  return app
}

export function deleteApp(appId) {
  cache.del("app-" + appId)
}

// export default nodeCache
// START PERFORMANCE MEASURE
// const hrstart = process.hrtime()

// END PERFORMANCE MEASURE
// const hrend = process.hrtime(hrstart)
// console.log(`${hrend[0]}s ${hrend[1] / 1000000}ms`)
