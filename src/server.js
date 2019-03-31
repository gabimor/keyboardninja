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

// import * as db from "./server/db"
import * as helpers from "./server/helpers"
import * as cache from "./server/cache"
import Layout from "./client/Layout"
import DataContext from "./client/DataContext"
import { page, pageStart, pageEnd } from "./server/page"
import "./server/auth"
import api from "./server/api"

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const app = express()

const router = express.Router()

let apps

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

app.use(async function(req, res, next) {
  if (!apps) {
    apps = await helpers.getAppsBasicData()
  }
  next()
})

app.use(express.static(process.env.RAZZLE_PUBLIC_DIR))
app.get("/__get-internal-source", async (req, res, next) => res.send())

app.get("/apps/:name", async (req, res, next) => {
  // TODO: find solution to /:name
  // if (
  //   req.params.name === "login" ||
  //   req.params.name === "signup" ||
  //   req.params.name === "__get-internal-source"
  // )
  //   next()

  const app = apps[req.params.name]
  let { os } = req.cookies

  // is os not found, change to the other
  // os = appBasicData.oss[os] ? os : ((os + 2) % 2) + 1

  // const app = await helpers.getApp(appBasicData.id, req.user, os)
  // app.oss = appBasicData.oss

  req.dataContext = { app, os }

  next()
})

app.get("/*", async (req, res) => {
  const appCategories = await cache.getAppCategories()

  const dataContext = {
    ...req.dataContext,
    appCategories,
    user: req.user,
  }

  // dataContext.os = dataContext.app.oss[req.cookies.os] ? +req.cookies.os :

  if (!req.user) {
    // TODO: restore cache
    let cachePage = undefined
    // let cachePage = cache.get(req.path + "-" + dataContext.os)
    if (!cachePage) {
      const markup = renderToString(getTemplate(req.url, dataContext))
      cachePage = page(markup, undefined, assets, dataContext)
      cache.set(req.path + "-" + req.cookies.os, cachePage)
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
})

const getTemplate = (url, dataContext) => (
  <DataContext.Provider value={dataContext}>
    <StaticRouter context={{}} location={url}>
      <Layout />
    </StaticRouter>
  </DataContext.Provider>
)

export default app
