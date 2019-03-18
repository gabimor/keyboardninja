import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import * as db from "./db"

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
  done(null, { email: user.email })
})

// deserialize user object
passport.deserializeUser(function(user, done) {
  done(null, user)
})
