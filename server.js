const express = require("express")
const next = require("next")
const mysql = require("promise-mysql")
const mongodb = require("mongodb")
const { MongoClient, ObjectId } = mongodb
const url = "mongodb://localhost:27017/keyboardninja"

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

let apps
let appCategories

process.env.PORT = process.env.PORT || 3000

main()

async function main() {
  apps = await getApps()
  appCategories = await getAppCategories()

  await app.prepare()

  const server = express()

  server.get("/api/apps/:id", async (req, res) => {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
    })

    const id = "5c6716e4ad58d167f43a0c84"

    const db = client.db("keyboardninja")

    const appCategory = await db
      .collection("apps")
      .find({ _id: ObjectId(id) })
      .toArray()

    const appData = appCategory[0].apps.find(e => e._id.toString() === id)

    client.close()
    res.json(appData)
  })

  async function getAppCategories() {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
    })

    const db = client.db("keyboardninja")
    const appCategories = await db
      .collection("app_categories")
      .find()
      .toArray()

    client.close()

    for (const category of appCategories) {
      for (let i = 0; i < category.apps.length; i++) {
        const appId = category.apps[i]
        let { name, icon } = apps.find(e => e._id.equals(appId))
        icon = "/static/logos/" + icon
        category.apps[i] = { _id: appId, name, icon }
      }
    }

    return appCategories
  }

  server.get("/api/app_categories", async (req, res) => {
    res.json(appCategories)
  })

  server.get("/", (req, res) => {
    return handle(req, res)
  })

  // server.get("/:name", async (req, res) => {
  //   const client = await MongoClient.connect(url, {
  //     useNewUrlParser: true,
  //   })

  //   const id = "5c6716e4ad58d167f43a0c84"
  //   const db = client.db("keyboardninja")

  //   const appCategory = await db
  //     .collection("apps")
  //     .find({ "apps._id": new mongodb.ObjectId(id) })
  //     .toArray()

  //   const appData = appCategory[0].apps.find(e => e._id.toString() === id)
  //   client.close()
  //   const actualPage = "/app"
  //   const queryParams = { id }
  //   app.render(req, res, actualPage, queryParams)

  //   // const actualPage = "/app"
  //   // const data = await getData()
  //   // const id = getAppIdByName(req.params.name, data.apps)
  //   // if (!id) {

  //   //   app.render(req, res, "/404")
  //   // } else {
  //   //   const queryParams = { id }
  //   //   app.render(req, res, actualPage, queryParams)
  //   // }
  // })

  server.get("*", (req, res) => {
    app.render(req, res, "/404")
  })

  server.listen(process.env.PORT, err => {
    if (err) throw err
    console.log("> Ready on http://localhost:" + process.env.PORT)
  })
}

async function getApps() {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
  })

  const db = client.db("keyboardninja")

  const apps = await db
    .collection("apps")
    .find()
    .toArray()

  client.close()

  return apps
}

// TODO: those are also found in client helpers.js, had trouble with storybook when importing from CommonJS helpers.js, changed to ES6 modules
function getAppIdByName(urlName, apps) {
  const app = apps.find(item => encodeAppName(item.name) === urlName)
  return app && app.id
}

function encodeAppName(name) {
  return name.toLowerCase().replace(new RegExp(" ", "g"), "-")
}
