const mysql = require("promise-mysql")
import mongoose from "mongoose"
import { User, AppCategory } from "./model"

mongoose.connect("mongodb://localhost:27017/keyboardninja", {
  useNewUrlParser: true,
})

const credentials = {
  host: "localhost",
  database: "keyboard_ninja",
  user: "root",
  password: "1234",
}

export async function getAppCategories() {
  const res = await AppCategory.find().lean()
  return res
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

export function findUser(email, password) {
  return User.findOne({ email, password })
}

export async function signupUser(email, password) {
  let user = await User.findOne({ email, password })

  if (!user) {
    user = new User({ email, password })
    await user.save()
  }

  return user
}
