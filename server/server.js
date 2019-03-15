const express = require("express")
const next = require("next")
const fs = require("fs")
const path = require("path")
const morgan = require("morgan")
// const bcrypt = require("bcrypt")
const bodyParser = require("body-parser")
const passport = require("passport")
const flash = require("connect-flash")
const LocalStrategy = require("passport-local").Strategy
const session = require("express-session")
const RedisStore = require("connect-redis")(session)

// routes
const app = express()
const api = require("./api")
const router = express.Router()

require("dotenv").config()

// const auth = require("./auth")
const db = require("./db")
const { encodeAppName } = require("./helpers")

const dev = process.env.NODE_ENV !== "production"
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

let apps
let appCategories

process.env.PORT = process.env.PORT || 3000

main()

async function main() {
  await nextApp.prepare()

  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"),
    { flags: "a" }
  )

  app.use(morgan("combined", { stream: accessLogStream }))
  app.use(
    session({
      store: new RedisStore({ host: "localhost", port: 6379 }),
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
    apps = await db.getApps()
    appCategories = await db.getAppCategories()
    next()
  })

  app.use("/", router)
  app.use("/api", api)

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async function(username, password, done) {
        try {
          const user = await db.findUser(username, password)
          if (user && user.length === 1) {
            return done(null, user[0])
          } else {
            return done(null, false, { message: "Incorrect email or password" })
          }
        } catch (err) {
          return done(err)
        }
      }
    )
  )

  // serialize user object
  passport.serializeUser(function(user, done) {
    // console.log("serialize")
    // console.log(user)
    done(null, user)
  })

  // deserialize user object
  passport.deserializeUser(function(user, done) {
    // console.log("deserialize")
    // console.log(user)
    done(null, user)
  })

  app.get("/", (req, res) => {
    return handle(req, res)
  })

  app.get("/login", (req, res) => {
    console.log("/login")
    console.log(req.user)
    return handle(req, res)
  })

  app.get("/:name", (req, res) => {
    const currApp = apps.find(e => encodeAppName(e.name) === req.params.name)
    const actualPage = "/app"

    if (currApp) {
      const queryParams = { id: currApp.id }
      nextApp.render(req, res, actualPage, queryParams)
    } else {
      nextApp.render(req, res, "/404")
    }
  })

  app.get("*", (req, res) => {
    nextApp.render(req, res, "/404")
  })

  app.listen(process.env.PORT, err => {
    if (err) throw err
    console.log("> Ready on http://localhost:" + process.env.PORT)
  })
}
