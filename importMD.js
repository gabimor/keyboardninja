const fs = require("fs")
const mysql = require("promise-mysql")

// SET THIS
const fileName = "visualstudio" 

const fullFileName = __dirname + "/assets/data/" + fileName + ".md"

let conn

main()

async function main() {
  conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "keyboard_ninja",
  })

  const fileObj = readFile(fullFileName)

  if (await shortcutsExist(fileObj.appId)) {
    console.log("aborting. app exists: " + fileObj.appId)
    conn.end()
    return
  }

  await addShortcuts(fileObj.appId, fileObj.os, fileObj.shortcuts)
  conn.end()

  console.log("finished")
}

function readFile(fileName) {
  const data = fs.readFileSync(fileName)
  const dataStr = data.toString()
  const headerInx = dataStr.toString().lastIndexOf("---")
  let lines = dataStr.substring(headerInx + 3, dataStr.length - 2).split("\n")

  const lineParams = lines[0].split(",")
  const appId = +lineParams[0].trim()
  const os = +lineParams[1].trim()
  const shortcuts = lines.splice(1)

  return { appId, os, shortcuts }
}

async function shortcutsExist(appId) {
  const shortcuts = await conn.query(
    `SELECT * FROM shortcuts WHERE appId = ${appId}`
  )
  const sections = await conn.query(
    `SELECT * FROM app_sections WHERE appId = ${appId}`
  )
  return shortcuts.length > 0 || sections.length > 0
}

async function addShortcuts(appId, os, shortcuts) {
  let currSectionId = 0
  for (const shortcut of shortcuts) {
    if (shortcut[0] === "#") {
      const sectionName = prepareStr(shortcut.substr(1))
      currSectionId++

      await conn.query(
        `INSERT INTO app_sections (id, appId, name) VALUES (${currSectionId}, ${appId}, "${sectionName}")`
      )
    } else {
      const splitshortcut = shortcut.split("(-)")
      const action = prepareStr(splitshortcut[0])
      const keys = prepareStr(splitshortcut[1])

      await conn.query(
        `INSERT INTO shortcuts (appId, \`action\`, \`keys\`, os, sectionId) VALUES (${appId}, "${action}", "${keys}", ${os}, ${currSectionId})`
      )
    }
  }
}

function prepareStr(str) {
  return str
    .trim()
    .split("\\")
    .join("\\\\")
}
