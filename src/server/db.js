const mysql = require("promise-mysql")

// TODO: make this work in production
// const credentials = {
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
// }

const credentials = {
  host: "localhost",
  database: "keyboard_ninja",
  user: "root",
  password: "1234",
}

export async function getAppCategories() {
  const conn = await mysql.createConnection(credentials)

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

export async function getApps() {
  const conn = await mysql.createConnection(credentials)

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

export async function getUserAppShortcuts(userId, appId) {
  const conn = await mysql.createConnection(credentials)

  const userShortcuts = await conn.query(
    `SELECT * FROM user_shortcuts WHERE userId = ${userId} AND appId = ${appId}`
  )

  conn.end()

  return userShortcuts
}

export function createApp(app, sections, shortcuts) {
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
      id: section.id,
      name: section.name,
      shortcuts: shortcuts.filter(e => e.sectionId === section.id),
    })
  }
  return result
}

export async function findUser(email, password) {
  const conn = await mysql.createConnection(credentials)

  const user = await conn.query(
    `SELECT * FROM users WHERE email="${email}" AND password="${password}"`
  )
  conn.end()

  return user
}

export async function signupUser(email, password) {
  const conn = await mysql.createConnection(credentials)

  let user = await conn.query(`SELECT * FROM users WHERE email="${email}"`)

  if (user.length === 0) {
    user = await conn.query(
      `INSERT INTO users (email, password) VALUES ("${email}", "${password}")`
    )
  } else {
    user = undefined
  }
  conn.end()

  return user
}