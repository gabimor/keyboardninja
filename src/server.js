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
import dotenv from "dotenv"

dotenv.config()

import { encodeAppName } from "./client/helpers"
import cache from "./server/cache"
import Layout from "./client/Layout"
import DataContext from "./client/DataContext"
import page from "./server/page"
import "./server/auth"
import api from "./server/api"

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const app = express()

const router = express.Router()

app.disable("x-powered-by")

app.use(
  session({
    secret: process.env.SESSION_SECRET,
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
app.use("/api", api)
app.use("/", router)

app.use(async function(req, res, next) {
  if (!cache.get("appCategories")) {
    const appCategories = await db.getAppCategories()
    cache.set("appCategories", appCategories)

    const apps = await db.getApps()
    cache.set("apps", apps)
  }
  next()
})

app.use(express.static(process.env.RAZZLE_PUBLIC_DIR))

app.get("/apps/:name", async (req, res, next) => {
  const app = cache
    .get("apps")
    .find(e => encodeAppName(e.name) === req.params.name)

  // if (req.user) {
  const userApp = await db.getUserAppShortcuts(1123, app.id)

  const dataContext = {
    app,
    userApp,
  }

  req.dataContext = dataContext
  next()
})

app.get("/*", (req, res) => {
  const appCategories = cache.get("appCategories")

  const dataContext = {
    ...req.dataContext,
    appCategories,
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
