const express = require("express")
const next = require("next")
// const bcrypt = require("bcrypt")
const bodyParser = require("body-parser")
const passport = require("passport")
const flash = require("connect-flash")
const LocalStrategy = require("passport-local").Strategy
const session = require("express-session")

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

  const app = express()

  app.use(
    session({
      secret: "W9t5wawtmal",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true },
    })
  )

  app.use(bodyParser.json())

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
    done(null, user)
  })

  // deserialize user object
  passport.deserializeUser(function(user, done) {
    done(err, user)
  })

  app.use(flash())
  app.use(passport.initialize())
  app.use(passport.session())

  app.use(async function(req, res, next) {
    // TODO: don't do this for every request
    apps = await db.getApps()
    appCategories = await db.getAppCategories()
    next()
  })

  app.post(
    "/api/login",
    function(req, res, next) {
      // passport.authenticate(
      //   "local",
      //   {
      //     successRedirect: "/",
      //     failureRedirect: "/login",
      //   },
      //   function(req, res) {
      //     // If this function gets called, authentication was successful.
      //     // `req.user` contains the authenticated user.
      //     res.redirect("/users/" + req.user.username)
      //   }
      // )

      passport.serializeUser(function(user, done) {
        done(null, user)
      })

      passport.deserializeUser(function(user, done) {
        done(err, user)
      })

      passport.authenticate("local", function(error, user, info) {
        if (error) {
          res.status(401).send(error)
        } else if (!user) {
          res.status(401).send(info)
        } else {
          // res.status(200).send("logged in")
          req.login(user, function(err) {
            if (err) {
              return next(err)
            }
            return res.redirect("/")
          })
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

  app.get("/api/apps/:id", (req, res) => {
    res.json(apps.find(e => e.id === +req.params.id))
  })

  app.get("/api/user", (req, res) => {
    res.send(req.user)
  })

  app.get("/api/app_categories", (req, res) => {
    res.json(appCategories)
  })

  app.get("/", (req, res) => {
    console.log(req.user)
    return handle(req, res)
  })

  app.get("/login", (req, res) => {
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
