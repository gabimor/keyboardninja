const express = require("express")
const next = require("next")
const bcrypt = require("bcrypt")
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
  await app.prepare()

  const server = express()

  server.use(
    session({
      secret: "W9t5wawtmal",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true },
    })
  )
  server.use(flash())
  server.use(passport.initialize())
  server.use(passport.session())

  passport.use(
    new LocalStrategy(function(username, password, done) {
      try {
        console.log("in passport")
        // const user = await db.findUser(username, password)
        if (!user) {
          return done(null, false, { message: "Incorrect email or password" })
        }
        return done(null, user)
      } catch (err) {
        return done(err)
      }
    })
  )

  // passport.serializeUser(function(user, done) {
  //   done(null, user.id)
  // })

  // // used to deserialize the user
  // passport.deserializeUser(function(id, done) {
  //   console.log(1)
  //   // conn.query("select * from users where id = " + id, function(err, rows) {
  //   //   done(err, rows[0])
  //   // })
  // })

  server.use(async function(req, res, next) {
    // TODO: don't do this for every request
    apps = await db.getApps()
    appCategories = await db.getAppCategories()
    next()
  })

  // server.post("/api/login", (req, res, next) => {
  //   return passport.authenticate(
  //     "local",
  //     { session: false },
  //     (err, passportUser, info) => {
  //       if (err) {
  //         return next(err)
  //       }

  //       if (passportUser) {
  //         const user = passportUser
  //         user.token = passportUser.generateJWT()

  //         return res.json({ user: user.toAuthJSON() })
  //       }

  //       return status(400).info
  //     }
  //   )(req, res, next)
  // })

  server.post(
    "/api/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
    })
  )

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
