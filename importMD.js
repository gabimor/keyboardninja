const fs = require("fs")
const mongodb = require("mongodb")
const { MongoClient, ObjectId, Logger } = mongodb
const url = "mongodb://localhost:27017/keyboardninja"

const fileName = "visualstudio"

const fullFileName = __dirname + "/assets/data/" + fileName + ".md"

const APP_CATEGORIES = { code: "5c6edbd64be441f542733f01" }
const categoryId = APP_CATEGORIES.code

let client
let db

main()

async function main() {
  client = await MongoClient.connect(url, {
    useNewUrlParser: true,
  })
  db = client.db("keyboardninja")

  const fileObj = readFile(fullFileName)

  if (await appExists(fileObj.appId)) {
    console.log("aborting. app exists: " + fileObj.appId)
    client.close()
    return
  }

  await addApp(
    fileObj.appId,
    fileObj.appName,
    fileObj.companyName,
    fileObj.icon
  )

  await addShortcuts(fileObj.appId, fileObj.os, fileObj.shortcuts)
  client.close()
}

function readFile(fileName) {
  const data = fs.readFileSync(fileName)
  const dataStr = data.toString()
  const headerInx = dataStr.toString().lastIndexOf("---")
  let lines = dataStr.substring(headerInx + 3, dataStr.length - 2).split("\n")

  const lineParams = lines[0].split(",")
  const appId = lineParams[0].trim()
  const appName = lineParams[1].trim()
  const companyName = lineParams[2].trim()
  const icon = lineParams[3].trim()
  const os = lineParams[4].trim()
  const shortcuts = lines.splice(1)

  return { appId, appName, companyName, icon, os, shortcuts }
}

async function appExists(id) {
  return await db.collection("apps").findOne({ _id: ObjectId(id) })
}

async function addApp(id, name, company, icon) {
  await db
    .collection("apps")
    .insertOne({ _id: ObjectId(id), name, company, icon })
}

async function addShortcuts(appId, os, shortcuts) {
  let currSection = ""
  for (const shortcut of shortcuts) {
    if (shortcut[0] === "#") {
      currSection = shortcut.substr(1).trim()
    } else {
      const splitshortcut = shortcut.split("(-)")
      const action = splitshortcut[0].trim()
      const keys = splitshortcut[1].trim()
      try {
        const result = await db.collection("apps").updateOne(
          { _id: ObjectId(appId) },
          {
            $push: {
              [os + "." + currSection]: {
                _id: ObjectId(),
                action,
                keys,
                pins: 0,
              },
            },
          }
        )
      } catch (err) {
        console.log(err)
      }
    }
  }
}

async function addToCategory(categoryId, appId) {
  return await db
    .collection("app_categories")
    .updateOne(
      { _id: ObjectId(categoryId) },
      { $addToSet: { apps: ObjectId(appId) } }
    )
}
