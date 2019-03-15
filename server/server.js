const express = require("express")
const next = require("next")
const fs = require("fs")
const path = require("path")
// const morgan = require("morgan")
// const bcrypt = require("bcrypt")
const bodyParser = require("body-parser")
const passport = require("passport")
const flash = require("connect-flash")
const session = require("express-session")

// const redisClient = require("redis").createClient()

const RedisStore = require("connect-redis")(session)
const redisStore = new RedisStore({ host: "localhost", port: 6379 })

// routes
const app = express()
const api = require("./api")
const router = express.Router()

require("dotenv").config()

const db = require("./db")
require("./auth")
const { encodeAppName } = require("./helpers")

const dev = process.env.NODE_ENV !== "production"
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

// global.apps
// global.appCategories

process.env.PORT = process.env.PORT || 3000

main()

async function main() {
  await nextApp.prepare()

  // const accessLogStream = fs.createWriteStream(
  //   path.join(__dirname, "access.log"),
  //   { flags: "a" }
  // )

  // app.use(morgan("combined", { stream: accessLogStream }))
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

  
  router.get("/", (req, res) => {
    return handle(req, res)
  })

  router.get("/login", (req, res) => {
    console.log("/login")
    console.log(req.user)
    return handle(req, res)
  })

  router.get("/:name", (req, res) => {
    const currApp = apps.find(
      e => encodeAppName(e.name) === req.params.name
    )
    const actualPage = "/app"

    if (currApp) {
      const queryParams = { id: currApp.id }
      nextApp.render(req, res, actualPage, queryParams)
    } else {
      nextApp.render(req, res, "/404")
    }
  })

  router.get("*", (req, res) => {
    nextApp.render(req, res, "/404")
  })

  app.listen(process.env.PORT, err => {
    if (err) throw err
    console.log("> Ready on http://localhost:" + process.env.PORT)
  })
}
