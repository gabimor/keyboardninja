const express = require("express")
const next = require("next")
const mysql = require("promise-mysql")

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

process.env.PORT = process.env.PORT || 3000

main()

async function main() {
  await app.prepare()

  const server = express()

  server.get("/api/data", async (req, res) => {
    const data = await getData()

    res.json(data)
  })

  server.get("/apps", (req, res) => {    
    return handle(req, res)
  })

  server.get("/about", (req, res) => {
    return handle(req, res)
  })

  server.get("/", (req, res) => {
    return handle(req, res)
  })

  server.get("/:name", async (req, res) => {
    const actualPage = "/searchResults"
    const data = await getData()
    const appId = getAppIdByName(req.params.name, data.apps)
    if (!appId) {
      app.render(req, res, "/404")
    } else {
      const queryParams = { appId }
      app.render(req, res, actualPage, queryParams)
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

async function getData() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "keyboard_ninja",
  })

  const shortcuts = await conn.query("select * from shortcuts")
  const apps = await conn.query("select * from apps")
  const appSections = await conn.query("SELECT * FROM app_sections")
  const appCategories = await conn.query("SELECT * FROM app_categories")
  const mostSearchedApps = await conn.query("SELECT * FROM apps LIMIT 5")
  const mostPinnedApps = await conn.query(
    "SELECT * FROM v_most_pinned_apps LIMIT 5"
  )
  const mostShortcutsApps = await conn.query(
    "SELECT * FROM v_most_shortcuts_apps LIMIT 5"
  )

  conn.end()

  return {
    apps,
    shortcuts,
    appCategories,
    appSections,
    mostSearchedApps,
    mostPinnedApps,
    mostShortcutsApps,
  }
}

// TODO: those are also found in client helpers.js, had trouble with storybook when importing from CommonJS helpers.js, changed to ES6 modules
function getAppIdByName(urlName, apps) {
  const app = apps.find(item => encodeAppName(item.name) === urlName)
  return app && app.id
}

function encodeAppName(name) {
  return name.toLowerCase().replace(new RegExp(" ", "g"), "-")
}
