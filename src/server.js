import React from "react" // eslint-disable-line no-unused-vars
import { StaticRouter } from "react-router-dom"
import { renderToString } from "react-dom/server"
import bodyParser from "body-parser"
import passport from "passport"
import flash from "connect-flash"
import session from "express-session"
import express from "express"
import * as db from "./server/db"
import "isomorphic-unfetch"

import Layout from "./client/Layout"
import DataContext from "./client/DataContext"
import page from "./server/page"

require("dotenv").config()
require("./server/auth")

const RedisStore = require("connect-redis")(session)
const redisStore = new RedisStore({ host: "localhost", port: 6379 })

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const app = express()

import api from "./server/api"
const router = express.Router()

app.disable("x-powered-by")

app.use(
  session({
    store: redisStore,
    secret: "W9t5wawtmal", // TODO: save somewhere else
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

app.get("/apps/:name", (req, res, next) => {
  fetch(process.env.API_URL + "api/apps/" + req.params.name)
    .then(r => r.json())
    .then(appData => {
      req.dataContext = {
        app: { name: appData.app.name, icon: appData.app.icon },
      }
      next()
    })
})

app.get("/*", (req, res) => {
  const dataContext = {
    appCategories,
    ...req.dataContext,
    user: req.user,
  }
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
