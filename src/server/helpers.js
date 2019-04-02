export function encodeAppName(name) {
  return name.toLowerCase().replace(new RegExp(" ", "g"), "-")
}

// export async function getAppsHash() {
//   const apps = await App.find().lean()
//   const userShortcuts = await UserShortcut.find().lean()

//   // calculate pins field
//   // go over every appid, userId record
//   for (const userShortcut of userShortcuts) {
//     // go over every shortcut in that record
//     for (const shortcut of userShortcut.shortcuts) {
//       const appToUpdate = apps.find(
//         e => e._id.toString() === userShortcut.appId.toString()
//       )

//       appToUpdate.shortcuts.find(e => e._id.toString() === shortcut.toString())
//         .pins++
//     }
//   }

//   const results = {}
//   for (const currApp of apps) {
//     results[encodeAppName(currApp.name)] = currApp
//   }

//   return results
// }

// import { App, UserShortcut } from "./models"

// export function encodeAppName(name) {
//   return name.toLowerCase().replace(new RegExp(" ", "g"), "-")
// }

// export async function getAppsHash() {
//   const apps = await App.find().lean()
//   const userShortcuts = await UserShortcut.find().lean()

//   // calculate pins field
//   // go over every appid, userId record
//   for (const userShortcut of userShortcuts) {
//     // go over every shortcut in that record
//     for (const shortcut of userShortcut.shortcuts) {
//       const appToUpdate = apps.find(
//         e => e._id.toString() === userShortcut.appId.toString()
//       )

//       appToUpdate.shortcuts.find(e => e._id.toString() === shortcut.toString())
//         .pins++
//     }
//   }

//   const results = {}
//   for (const currApp of apps) {
//     results[encodeAppName(currApp.name)] = currApp
//   }

//   return results
// }
