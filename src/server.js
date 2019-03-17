import React from "react"
import App from "./client/App"
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
      <App appCategories={global.appCategories} />
    </StaticRouter>
  )

  if (context.url) {
    res.redirect(context.url)
  } else {
    let assetsStr = assets.client.css
      ? `<link rel="stylesheet" href="${assets.client.css}">`
      : ""
    assetsStr +=
      process.env.NODE_ENV === "production"
        ? `<script src="${assets.client.js}" defer></script>`
        : `<script src="${assets.client.js}" defer crossorigin></script>`

    res.status(200).send(
      `<!doctype html>
        <html lang="">
        <head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charset="utf-8" />
          <title>Welcome to Razzle</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link
            href="https://use.fontawesome.com/releases/v5.4.2/css/all.css"
            integrity="sha384-/rXc/GQVaYpyDdyxK+ecHPVYJSN9bmVFBvjA/9eOB+pb3F2w2N6fc5qB9Ew5yIns"
            crossOrigin="anonymous"
            rel="stylesheet" />
          <link
            href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i"
            rel="stylesheet" />
          ${assetsStr}
        </head>
        <body>
          <div id="root">${markup}</div>
        </body>
        <!-- Hotjar Tracking Code for http://www.keyboardninja.me -->
        <script>
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:1186459,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        </script>
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-90675788-2"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
      
          gtag('config', 'UA-90675788-2');
        </script>          
        </html>`
    )
  }
})

export default app
