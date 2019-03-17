import App from "./client/pages/App"
import React from "react"
import { StaticRouter } from "react-router-dom"
import express from "express"
import { renderToString } from "react-dom/server"
import * as db from "./server/db"

const bodyParser = require("body-parser")
const passport = require("passport")
const flash = require("connect-flash")
const session = require("express-session")

const RedisStore = require("connect-redis")(session)
const redisStore = new RedisStore({ host: "localhost", port: 6379 })


const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const app = express()

require("dotenv").config()
require("./server/auth")

const api = require("./server/api")
const router = express.Router()

app.disable("x-powered-by")

app.use(
  session({
    store: redisStore,
    secret: "W9t5wawtmal",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 300000 },
  })
)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())
app.use(flash())
app.use(passport.session())

app.use(async function(req, res, next) {
  // TODO: don't do this for every request
  global.apps = await db.getApps()
  global.appCategories = await db.getAppCategories()
  next()
})

app.use("/api", api)
app.use("/", router)

app.use(express.static(process.env.RAZZLE_PUBLIC_DIR))

app.get("/*", (req, res) => {
  const context = {}
  const markup = renderToString(
    <StaticRouter context={context} location={req.url}>
      <App />
    </StaticRouter>
  )

  if (context.url) {
    res.redirect(context.url)
  } else {
    res.status(200).send(
      `<!doctype html>
          <html lang="">
          <head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta charset="utf-8" />
            <title>Welcome to Razzle</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
              ${
                assets.client.css
                  ? `<link rel="stylesheet" href="${assets.client.css}">`
                  : ""
              }
              ${
                process.env.NODE_ENV === "production"
                  ? `<script src="${assets.client.js}" defer></script>`
                  : `<script src="${
                      assets.client.js
                    }" defer crossorigin></script>`
              }
            </head>
            <body>
                <div id="root">${markup}</div>
            </body>
          </html>`
    )
  }
})

export default app
