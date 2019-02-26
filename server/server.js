const express = require("express")
const next = require("next")
const db = require("./db")
const { encodeAppName } = require("./helpers")

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

let apps
let appCategories

process.env.PORT = process.env.PORT || 3000

main()

async function main() {
  // apps = await db.getApps()
  // appCategories = await db.getAppCategories()

  await app.prepare()

  const server = express()

  server.use(async function(req, res, next) {
    apps = await db.getApps()
    appCategories = await db.getAppCategories()
    next()
  })

  server.get("/api/apps/:id", async (req, res) => {
    res.json(apps.find(e => e.id === +req.params.id))
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
      const queryParams = { id: currApp.id }
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
