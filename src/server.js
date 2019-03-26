/* eslint-disable import/first */
import React from "react" // eslint-disable-line no-unused-vars
import { StaticRouter } from "react-router-dom"
import { renderToString, renderToNodeStream } from "react-dom/server"
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
import * as cache from "./server/cache"
import Layout from "./client/Layout"
import DataContext from "./client/DataContext"
import { page, pageStart, pageEnd } from "./server/page"
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
  // TODO: remove
  // req.user = { id: 1123, email:"fromserver@asdas.com" }
  next()
})

app.use(express.static(process.env.RAZZLE_PUBLIC_DIR))

app.get("/:name", async (req, res, next) => {
  if (req.params.name === "login" || req.params.name === "signup") next()

  const app = await cache.getApp(39)

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

app.get("/*", async (req, res) => {
  const appCategories = await cache.getAppCategories()

  const dataContext = {
    ...req.dataContext,
    appCategories,
    user: req.user,
  }

  if (!req.user) {
    let cachePage = cache.getPage(req.path)
    if (!cachePage) {
      const markup = renderToString(
        <DataContext.Provider value={dataContext}>
          <StaticRouter context={{}} location={req.url}>
            <Layout />
          </StaticRouter>
        </DataContext.Provider>
      )
      cachePage = page(markup, undefined, assets, dataContext)
      cache.setPage(req.path, cachePage)
    }
    res.status(200).send(cachePage)
  } else {
    res.write(pageStart(undefined, assets, dataContext))
    const stream = renderToNodeStream(
      <DataContext.Provider value={dataContext}>
        <StaticRouter context={{}} location={req.url}>
          <Layout />
        </StaticRouter>
      </DataContext.Provider>
    )

    stream.pipe(
      res,
      { end: "false" }
    )
    stream.on("end", () => {
      res.end(pageEnd())
    })
  }
})

export default app
