/* eslint-disable import/first */
import React from "react" // eslint-disable-line no-unused-vars
import { StaticRouter } from "react-router-dom"
import { renderToString, renderToNodeStream } from "react-dom/server"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import passport from "passport"
import flash from "connect-flash"
import session from "express-session"
import express from "express"
import compression from "compression"
import dotenv from "dotenv"

dotenv.config()

import * as cache from "./server/cache"
import Layout from "./client/Layout"
import DataContext from "./client/DataContext"
import { page, pageStart, pageEnd } from "./server/page"
import "./server/auth"
import api from "./server/api"
import { UserShortcut } from "./server/models"

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
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())
app.use(flash())
app.use(passport.session())
app.use("/api", api)
app.use("/", router)

app.use(express.static(process.env.RAZZLE_PUBLIC_DIR))

app.get("/apps/:name", async (req, res, next) => {
  // TODO: find solution to /:name
  // if (
  //   req.params.name === "login" ||
  //   req.params.name === "signup" ||
  //   req.params.name === "__get-internal-source"
  // )
  //   next()
  try {
    const appsHash = await cache.getAppsHash()
    const appId = appsHash[req.params.name]

    if (!appId) return next()

    const app = await cache.getApp(appId)

    let { os } = req.cookies
    if (!os) {
      os = req.headers["user-agent"].toLowerCase().includes("win")
        ? "win"
        : "mac"
    }
    // if app doesn't support the detected os, switch os to the one that's supported
    if (!app.oss.includes(os)) {
      os = app.oss[0]
    }

    if (req.user) {
      const userShortcuts = await UserShortcut.findOne({
        userId: req.user.id,
        appId: app._id,
      })
      if (userShortcuts) {
        for (const shortcutId of userShortcuts.shortcuts) {
          app.shortcuts.find(
            e => e._id.toString() === shortcutId.toString()
          ).isPinned = true
        }
      }
    }

    const appCategories = await cache.getAppCategories()
    const dataContext = { app, os, appCategories }

    sendPage(req, res, dataContext)
  } catch (err) {
    next(err)
  }
})

app.get("/*", async (req, res) => {
  console.log("started11111")
  const appCategories = await cache.getAppCategories()

  const dataContext = {
    appCategories,
    user: req.user,
  }

  sendPage(req, res, dataContext)
})

// app.use(function(err, req, res, next) {
//   console.log("error!!")
// })

const getTemplate = (url, dataContext) => (
  <DataContext.Provider value={dataContext}>
    <StaticRouter context={{}} location={url}>
      <Layout />
    </StaticRouter>
  </DataContext.Provider>
)

const sendPage = (req, res, dataContext) => {
  if (!req.user) {
    let cachePage = cache.get(req.path + "-" + dataContext.os)
    if (!cachePage) {
      const markup = renderToString(getTemplate(req.url, dataContext))
      cachePage = page(markup, undefined, assets, dataContext)
      cache.set(req.path + "-" + dataContext.os, cachePage)
    }
    res.status(200).send(cachePage)
  } else {
    res.write(pageStart(undefined, assets, dataContext))
    const stream = renderToNodeStream(getTemplate(req.url, dataContext))
    stream.pipe(
      res,
      { end: "false" }
    )
    stream.on("end", () => {
      res.end(pageEnd())
    })
  }
}

export default app
