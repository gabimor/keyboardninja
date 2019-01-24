const express = require('express')
const next = require('next')

const { getAppIdByName } = require('./helpers')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const data = require('./data')

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

