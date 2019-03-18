import React from "react" // eslint-disable-line no-unused-vars
import { StaticRouter } from "react-router-dom"
import { renderToString } from "react-dom/server"
import App from "./client/App"

import express from "express"
import * as db from "./server/db"
import page from "./server/page"

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
app.use(express.static(process.env.RAZZLE_PUBLIC_DIR))

app.use("/api", api)
app.use("/", router)

app.get("/*", (req, res) => {
  const context = {}
  const markup = renderToString(
    <StaticRouter context={context} location={req.url}>
      <App appCategories={global.appCategories} />
    </StaticRouter>
  )

  if (context.url) {
    res.redirect(context.url)
  } else {
    let head = assets.client.css
      ? `<link rel="stylesheet" href="${assets.client.css}">`
      : ""
    head +=
      process.env.NODE_ENV === "production"
        ? `<script src="${assets.client.js}" defer></script>`
        : `<script src="${assets.client.js}" defer crossorigin></script>`

    res.status(200).send(page(markup, head, global.appCategories))
  }
})

export default app
