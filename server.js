const express = require('express')
const next = require('next')
const mysql = require('promise-mysql')

const { getAppIdByName } = require('./helpers')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

main()

async function main() {
  await app.prepare()

  const server = express()
  
  server.get('/apps/:name', (req, res) => {
    const actualPage = "/"
    const appId = getAppIdByName(req.params.name, data.apps)
    const queryParams = {appId}
    app.render(req, res, actualPage, queryParams)
  })

  server.get('/data', async (req, res) => {
    const data = await getData()

    res.json(data)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })
  
  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
}

async function getData() {
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'keyboard_ninja'
  })

  const shortcuts = await conn.query('select * from shortcuts')
  const apps = await conn.query('select * from apps')
  const appSections = await conn.query('SELECT * FROM app_sections')
  const appCategories = await conn.query('SELECT * FROM app_categories')
  const mostSearchedApps = await conn.query('SELECT * FROM apps LIMIT 5')
  const mostPinnedApps = await conn.query('SELECT * FROM v_most_pinned_apps LIMIT 5')
  const mostShortcutsApps = await conn.query('SELECT * FROM v_most_shortcuts_apps LIMIT 5')

  conn.end();

  return {
    apps,
    shortcuts,
    appCategories,
    appSections,
    mostSearchedApps,
    mostPinnedApps,
    mostShortcutsApps
  }
}
