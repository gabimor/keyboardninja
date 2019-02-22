const fs = require("fs")
const mongodb = require("mongodb")
const { MongoClient, ObjectId, Logger } = mongodb
const url = "mongodb://localhost:27017/keyboardninja"

const fileName = "visualstudio"
// const categoryId = "5c6753604f37ee85301e42ae"
// const appId = "5c6753604f37ee85301e4287"
const fullFileName = __dirname + "/assets/data/" + fileName + ".md"

main()

let client
let db

async function main() {
  client = await MongoClient.connect(url, {
    useNewUrlParser: true,
  })
  db = client.db("keyboardninja")

  const fileObj = readFile(fullFileName)

  const id = await addApp(fileObj.appName, fileObj.companyName, fileObj.icon)

  await addShortcuts(id.toString(), fileObj.os, fileObj.shortcuts)
  client.close()
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
        const res = await db.collection("apps").updateOne(
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

function readFile(fileName) {
  const data = fs.readFileSync(fileName)
  const dataStr = data.toString()
  const headerInx = dataStr.toString().lastIndexOf("---")
  let lines = dataStr.substring(headerInx + 3, dataStr.length - 2).split("\n")

  const lineParams = lines[0].split(",")
  const appName = lineParams[0].trim()
  const companyName = lineParams[1].trim()
  const icon = lineParams[2].trim()
  const os = lineParams[3].trim()
  const shortcuts = lines.splice(1)

  return { appName, companyName, icon, os, shortcuts }
}

async function addApp(name, company, icon) {
  const app = await db.collection("apps").insertOne({ name, company, icon })

  return app.insertedId
}
