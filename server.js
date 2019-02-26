const express = require("express")
const next = require("next")
// const passport = require("passport")
const mongodb = require("mongodb")
const { MongoClient, ObjectId } = mongodb
const { encodeAppName } = require("./serverHelpers")

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
    res.json(apps.find(e => e._id.equals(ObjectId(req.params.id))))
  })

  server.get("/api/app_categories", async (req, res) => {
    res.json(appCategories)
  })

  server.get("/", (req, res) => {
    return handle(req, res)
  })

  server.get("/:name", async (req, res) => {
    const currApp = apps.find(e => encodeAppName(e.name) === req.params.name)
    const actualPage = "/app"

    if (currApp) {
      const queryParams = { id: currApp._id }
      app.render(req, res, actualPage, queryParams)
    } else {
      app.render(req, res, "/404")
    }
  })

  server.get("*", (req, res) => {
    app.render(req, res, "/404")
  })

  server.listen(process.env.PORT, err => {
    if (err) throw err
    console.log("> Ready on http://localhost:" + process.env.PORT)
  })
}

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
