import NodeCache from "node-cache";

import { encodeAppName } from "./helpers";

import { App, AppCategory, UserShortcut } from "../src/server/db/App.schema";

const nodeCache = new NodeCache();

export async function getAppsHash() {
  let appsHash = nodeCache.get("appsHash");
  if (!appsHash) {
    appsHash = [];
    const apps = await App.find();
    for (const app of apps) {
      appsHash.push({ id: app._id.toString(), name: encodeAppName(app.name) });
    }
    nodeCache.set("appsHash", appsHash);
  }
  return appsHash;
}

export async function getAppCategories() {
  console.log(1);

  let appCategories = nodeCache.get("appCategories");
  console.log(2);

  if (!appCategories) {
    console.log(3);

    appCategories = await AppCategory.find().lean();
    console.log(4);
    nodeCache.set("appHash", appCategories);
  }
  console.log(4);

  return appCategories;
}

export async function clearApp(appId: string) {
  nodeCache.del("app-" + appId);
}

export async function getApp(appId: string) {
  let cacheApp;
  // NO CACHE FOR NOW
  // = nodeCache.get("app-" + appId)
  if (!cacheApp) {
    cacheApp = await App.findById(appId).lean();
    cacheApp.shortcuts = cacheApp.shortcuts.map((shortcut) => ({
      ...shortcut,
      pins: 0,
    }));

    const userShortcuts = await UserShortcut.find({ appId: appId }).lean();
    // calculate pins field
    // go over every appid, userId record
    for (const userShortcut of userShortcuts) {
      // go over every shortcut in that record
      for (const shortcut of userShortcut.shortcuts) {
        const app = cacheApp.shortcuts.find(
          (e) => e._id.toString() === shortcut.toString()
        );
        app.pins++;
      }
    }
  }

  return cacheApp;
}

export function set(key: string, value: unknown) {
  nodeCache.set(key, value);
}

export function get(key: string) {
  return nodeCache.get(key);
}

// export function setPin(appId, shortcutId, isPinned) {
//   const app = nodeCache.get("app-" + appId)

//   const change = isPinned ? 1 : -1
//   app.shortcuts.find(
//     e => e._id.toString() === shortcutId.toString()
//   ).pins += change

//   nodeCache.set("app-" + appId, app)
// }

// export default nodeCache
// START PERFORMANCE MEASURE
// const hrstart = process.hrtime()

// END PERFORMANCE MEASURE
// const hrend = process.hrtime(hrstart)
// console.log(`${hrend[0]}s ${hrend[1] / 1000000}ms`)
