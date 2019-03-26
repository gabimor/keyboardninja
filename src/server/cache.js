import NodeCache from "node-cache"
import * as db from "./db"

const cache = new NodeCache()

export async function getAppCategories() {
  let appCategories = cache.get("appCategories")
  if (!appCategories) {
    appCategories = await db.getAppCategories()
    cache.set("appCategories", appCategories)
  }
  return appCategories
}

export function getPage(path) {
  return cache.get(path)
}

export function setPage(path, page) {
  cache.set(path, page)
}

export async function getApp(appId) {
  const cacheKey = "app-" + appId
  let app = cache.get(cacheKey)

  if (!app) {
    app = await db.getApp(appId)

    app.sections = await db.getAppSections(appId)
    const allShortcuts = await db.getAllShortcuts()

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
