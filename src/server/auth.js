import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"

import { User } from "./models"

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function(username, password, done) {
      try {
        const user = await User.findOne({ username, password })
        if (user) {
          return done(null, user)
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
  done(null, { id: user.id, email: user.email })
})

// deserialize user object
passport.deserializeUser(function(user, done) {
  done(null, user)
})
