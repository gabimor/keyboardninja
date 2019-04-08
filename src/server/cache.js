import NodeCache from "node-cache"

import { encodeAppName } from "./helpers"

import { App, AppCategory, UserShortcut } from "./models"

const nodeCache = new NodeCache()

export async function getAppsHash() {
  // let appsHash = nodeCache.get("appsHash")
  let appsHash
  if (!appsHash) {
    appsHash = {}
    const apps = await App.find()
    for (const app of apps) {
      appsHash[encodeAppName(app.name)] = app._id
    }
    nodeCache.set("appsHash", appsHash)
  }
  return appsHash
}

export async function getAppCategories() {
  let appCategories = nodeCache.get("appCategories")
  if (!appCategories) {
    appCategories = await AppCategory.find().lean()
    nodeCache.set("appHash", appCategories)
  }
  return appCategories
}

export function setPin(appId, shortcutId, isPinned) {
  const app = nodeCache.get("app-" + appId)

  const change = isPinned ? 1 : -1
  app.shortcuts.find(
    e => e._id.toString() === shortcutId.toString()
  ).pins += change

  nodeCache.set("app-" + appId, app)
}

export async function getApp(appId) {
  // let cacheApp = nodeCache.get("app-" + appId)
  let cacheApp

  if (!cacheApp) {
    cacheApp = await App.findById(appId).lean()
    const userShortcuts = await UserShortcut.find({ appId: appId }).lean()

    // calculate pins field
    // go over every appid, userId record
    for (const userShortcut of userShortcuts) {
      // go over every shortcut in that record
      for (const shortcut of userShortcut.shortcuts) {
        const app = cacheApp.shortcuts.find(
          e => e._id.toString() === shortcut.toString()
        )
        app.pins = app.pins || 0
        app.pins++
      }
    }
  }

  return cacheApp
}

export function set(key, value) {
  nodeCache.set(key, value)
}

export function get(key) {
  // return nodeCache.get(key)
}
// export default nodeCache
// START PERFORMANCE MEASURE
// const hrstart = process.hrtime()

// END PERFORMANCE MEASURE
// const hrend = process.hrtime(hrstart)
// console.log(`${hrend[0]}s ${hrend[1] / 1000000}ms`)
