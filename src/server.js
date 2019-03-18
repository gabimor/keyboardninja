import React from "react" // eslint-disable-line no-unused-vars
import { StaticRouter } from "react-router-dom"
import { renderToString } from "react-dom/server"
import Layout from "./client/Layout"
import DataContext from "./client/DataContext"

import express from "express"
import * as db from "./server/db"
import page from "./server/page"

import bodyParser from "body-parser"
import passport from "passport"
import flash from "connect-flash"
import session from "express-session"

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

let appCategories = []

app.use(async function(req, res, next) {
  if (appCategories.length === 0) appCategories = await db.getAppCategories()
  if (!global.apps) global.apps = await db.getApps()
  next()
})

app.use(express.static(process.env.RAZZLE_PUBLIC_DIR))
app.use("/api", api)
app.use("/", router)

app.get("/apps/:name", (req, res) => {
  const dataContext = { appCategories }
  const markup = renderToString(
    <DataContext.Provider value={dataContext}>
      <StaticRouter context={{}} location={req.url}>
        <Layout />
      </StaticRouter>
    </DataContext.Provider>
  )
  res
    .status(200)
    .send(page(markup, "App Name - Keyboard Ninja Me", assets, dataContext))
})

app.get("/*", (req, res) => {
  const dataContext = { appCategories }
  const context = {}
  const markup = renderToString(
    <DataContext.Provider value={dataContext}>
      <StaticRouter context={{}} location={req.url}>
        <Layout />
      </StaticRouter>
    </DataContext.Provider>
  )

  if (context.url) {
    res.redirect(context.url)
  } else {
    res.status(200).send(page(markup, undefined, assets, dataContext))
  }
})

export default app
