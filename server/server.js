const express = require("express")
const next = require("next")
const bcrypt = require("bcrypt")
const bodyParser = require("body-parser")
const passport = require("passport")
const flash = require("connect-flash")
const LocalStrategy = require("passport-local").Strategy
const session = require("express-session")

// const auth = require("./auth")
const db = require("./db")
const { encodeAppName } = require("./helpers")

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

let apps
let appCategories

process.env.PORT = process.env.PORT || 3000

main()

async function main() {
  // await app.prepare()

  const server = express()

  server.use(
    session({
      secret: "W9t5wawtmal",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true },
    })
  )

  server.use(bodyParser.json())

  passport.use(
    new LocalStrategy(async function(username, password, done) {
      try {
        // console.log("in passport")
        const user = await db.findUser(username, password)
        if (!user) {
          return done(null, false, { message: "Incorrect email or password" })
        }
        return done(null, user)
      } catch (err) {
        return done(err)
      }
    })
  )

  // serialize user object
  passport.serializeUser(function(user, done) {
    done(null, user)
  })

  // deserialize user object
  passport.deserializeUser(function(user, done) {
    done(err, user)
  })

  server.use(flash())
  server.use(passport.initialize())
  server.use(passport.session())

  server.use(async function(req, res, next) {
    // TODO: don't do this for every request
    apps = await db.getApps()
    appCategories = await db.getAppCategories()
    next()
  })

  server.post(
    "/api/login",
    function(req, res, next) {
      passport.authenticate("local", function(error, user, info) {
        console.log(error)
        console.log(user)
        console.log(info)

        if (error) {
          res.status(401).send(error)
        } else if (!user) {
          res.status(401).send(info)
        } else {
          next()
        }
      })(req, res)
    },

    // function to call once successfully authenticated
    function(req, res) {
      res.status(200).send("logged in!")
    }
  )
  // server.post(
  //   "/api/login",
  //   passport.authenticate("local", {
  //     successRedirect: "/",
  //     failureRedirect: "/login",
  //     failureFlash: true,
  //   })
  // )

  server.get("/api/apps/:id", async (req, res) => {
    res.json(apps.find(e => e.id === +req.params.id))
  })

  server.get("/api/app_categories", async (req, res) => {
    res.json(appCategories)
  })

  server.get("/", (req, res) => {
    return handle(req, res)
  })

  server.get("/login", (req, res) => {
    return handle(req, res)
  })

  server.get("/:name", async (req, res) => {
    const currApp = apps.find(e => encodeAppName(e.name) === req.params.name)
    const actualPage = "/app"

    if (currApp) {
      const queryParams = { id: currApp.id }
      app.render(req, res, actualPage, queryParams)
    } else {
      app.render(req, res, "/404")
    }
  })

  server.get("*", (req, res) => {
    app.render(req, res, "/404")
  })

  server.listen(process.env.PORT, err => {
    if (err) throw err
    console.log("> Ready on http://localhost:" + process.env.PORT)
  })
}
