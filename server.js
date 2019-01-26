const express = require('express')
const next = require('next')
const mysql = require('promise-mysql')

const { getAppIdByName } = require('./helpers')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

main()

async function main() {
  const data = await getData()

  await app.prepare()

  const server = express()
  
  server.get('/apps/:name', (req, res) => {
    const actualPage = "/"
    const appId = getAppIdByName(req.params.name, data.apps)
    const queryParams = {appId}
    app.render(req, res, actualPage, queryParams)
  })

  server.get('/data', (req, res) => {
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
  const appSections = await conn.query('select * from app_sections')
  const appCategories = await conn.query('select * from app_categories')

  conn.end();

  return {
    apps,
    shortcuts,
    appCategories,
    appSections
  }
}
