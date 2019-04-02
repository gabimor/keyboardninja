/* eslint-disable no-console */
import fs from "fs"
import mongoose from "mongoose"

import { App } from "../server/models"

mongoose.connect("mongodb://localhost:27017/keyboardninja", {
  useNewUrlParser: true,
})

// 1. SET fullFileName
// 2. BEFORE FIRST HEADER, ADD ---name,icon,os1,[os2]
// 3. lower case
// 4. PgUp, PgDn
// 5. proofing

const fullFileName =
  "C:\\MyStuff\\Code\\keyboardninja\\assets\\data\\sublime.md"

main()

async function main() {
  try {
    const appObj = readFile(fullFileName)

    const app = await App.find({ name: appObj.name })

    if (app.length > 0) {
      console.log("aborting. app exists: " + appObj.name)
      return
    }

    await addApp(appObj)
    console.log(appObj.name + " added")
  } catch (err) {
    console.log(err)
  }
}

async function addApp({ name, icon, oss, shortcuts }) {
  const appData = { name, icon, oss, sections: [], shortcuts: [] }

  let sectionId
  for (const shortcutLine of shortcuts) {
    if (shortcutLine[0] === "#") {
      const sectionName = prepareStr(shortcutLine.substr(1))
      sectionId = mongoose.Types.ObjectId()

      appData.sections.push({ _id: sectionId, name: sectionName })
    } else {
      const splitShortcut = shortcutLine.split("(-)")
      const shortcut = { pins: 0, sectionId }

      shortcut.action = prepareStr(splitShortcut[0])
      shortcut[oss[0]] = prepareStr(splitShortcut[1])
      if (oss[1]) {
        shortcut[oss[1]] = prepareStr(splitShortcut[2])
      }

      appData.shortcuts.push(shortcut)
    }
  }

  const app = new App(appData)
  app.save()
}

function readFile(fileName) {
  const data = fs.readFileSync(fileName)
  const dataStr = data.toString()
  const headerInx = dataStr.toString().lastIndexOf("---")
  let lines = dataStr.substring(headerInx + 3, dataStr.length - 2).split("\n")

  const lineParams = lines[0].split(",")
  const result = {}
  result.name = lineParams[0].trim()
  result.icon = lineParams[1].trim()
  result.oss = [lineParams[2].trim()]
  if (lineParams[3]) result.oss.push(lineParams[3].trim())

  result.shortcuts = lines.splice(1)

  return result
}

function prepareStr(str) {
  return str
    .trim()
    .split("\\")
    .join("\\\\")
}
