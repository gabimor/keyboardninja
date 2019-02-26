const mysql = require("promise-mysql")

async function getAppCategories() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "keyboard_ninja",
  })

  const apps = await conn.query("SELECT * FROM apps")
  const appCategories = await conn.query("SELECT * FROM app_categories")

  const result = []
  for (const category of appCategories) {
    const filteredApps = apps.filter(e => e.categoryId === category.id)

    result.push({
      name: category.name,
      apps: filteredApps,
    })
  }
  conn.end()

  return result
}

async function getApps() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "keyboard_ninja",
  })

  const apps = await conn.query("SELECT * FROM apps")
  const appSections = await conn.query(
    "SELECT * FROM app_sections ORDER BY `order`"
  )
  const shortcuts = await conn.query("SELECT * FROM shortcuts")

  const result = []
  for (const app of apps) {
    result.push(createApp(app, appSections, shortcuts))
  }

  conn.end()

  return result
}

function createApp(app, sections, shortcuts) {
  const result = {
    id: app.id,
    name: app.name,
    icon: app.icon,
    win: [],
    mac: [],
  }
  for (const section of sections.filter(e => e.appId === app.id)) {
    const os = section.os === 1 ? "win" : "mac"

    result[os].push({
      name: section.name,
      shortcuts: shortcuts.filter(e => e.sectionId === section.id),
    })
  }
  return result
}

module.exports = { getApps, getAppCategories }
