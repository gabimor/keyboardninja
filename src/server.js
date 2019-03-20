/* eslint-disable import/first */
import React from "react" // eslint-disable-line no-unused-vars
import { StaticRouter } from "react-router-dom"
import { renderToString } from "react-dom/server"
import bodyParser from "body-parser"
import passport from "passport"
import flash from "connect-flash"
import session from "express-session"
import express from "express"
import compression from "compression"
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

app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())
app.use(flash())
app.use(passport.session())
app.use("/api", api)
app.use("/", router)

app.use(async function(req, res, next) {
  if (!cache.get("appCategories")) {
    cache.set("appCategories", await db.getAppCategories())
    const allSections = await db.getAppSections()
    const allShortcuts = await db.getShortcuts()

    for (const currApp of await db.getApps()) {
      const sections = allSections.filter(e => e.appId === currApp.id)

      const sectionIds = sections.map(e => e.id)
      const shortcuts = allShortcuts.filter(e =>
        sectionIds.includes(e.sectionId)
      )

      cache.set("app-" + encodeAppName(currApp.name), {
        ...currApp,
        sections,
        shortcuts,
      })
    }
  }
  next()
})

app.use(express.static(process.env.RAZZLE_PUBLIC_DIR))

app.get("/apps/:name", async (req, res, next) => {
  const app = cache.get("app-" + encodeAppName(req.params.name))

  if (req.user) {
    const userShortcuts = await db.getUserShortcuts(req.user.id, app.id)

    for (const userShortcut of userShortcuts) {
      const shortcut = app.shortcuts.find(e => e.id === userShortcut.shortcutId)
      shortcut.isPinned = true
    }
  }

  const currOSSectionIds = app.sections.filter(e => e.os === 1).map(e => e.id)
  // TODO: get os code from the client
  app.shortcuts = app.shortcuts.filter(e =>
    currOSSectionIds.includes(e.sectionId)
  )
  req.dataContext = { app }
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
