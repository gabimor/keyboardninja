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

  conn.end()

  return apps
}

export async function getApp(appId) {
  const conn = await mysql.createConnection(credentials)

  const apps = await conn.query(`SELECT * FROM apps WHERE id = ${appId}`)

  conn.end()

  return apps[0]
}

export async function getAllSections() {
  const conn = await mysql.createConnection(credentials)

  const allSections = await conn.query("SELECT * FROM app_sections")

  conn.end()

  return allSections
}

export async function getAllShortcuts() {
  const conn = await mysql.createConnection(credentials)

  const shortcuts = await conn.query("SELECT * FROM shortcuts")

  conn.end()

  return shortcuts
}

export async function getUserShortcuts(userId, appId) {
  const conn = await mysql.createConnection(credentials)

  const userShortcuts = await conn.query(
    `SELECT * FROM user_shortcuts WHERE userId = ${userId} AND appId = ${appId}`
  )

  conn.end()

  return userShortcuts
}

export async function getShortcutsPins(appId) {
  const conn = await mysql.createConnection(credentials)

  const shortcutsPins = await conn.query(
    `SELECT shortcutId as id, COUNT(*) as pins FROM user_shortcuts WHERE appId = ${appId} GROUP BY shortcutId`
  )

  conn.end()

  return shortcutsPins
}

export async function setPin(userId, appId, shortcutId, isPinned) {
  const conn = await mysql.createConnection(credentials)

  if (isPinned) {
    await conn.query(
      `INSERT INTO user_shortcuts (userId, appId, shortcutId) VALUES(${userId}, ${appId}, ${shortcutId})`
    )
  } else {
    await conn.query(
      `DELETE FROM user_shortcuts WHERE userId = ${userId} AND shortcutId = ${shortcutId}`
    )
  }

  conn.end()
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
