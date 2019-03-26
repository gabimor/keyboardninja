import passport from "passport"
import express from "express"

import * as db from "./db"
import * as cache from "./cache"

const router = express.Router()

router.post("/signup", function(req, res, next) {
  const { email, password } = req.body

  db.signupUser(email, password).then(insertedUser => {
    req.login({ email, password }, function(err) {
      if (err) {
        return next(err)
      }
      return res.json({ email })
    })
  })
})

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: true,
//   }),
//   (req, res, next) => {
//     req.session.save(err => {
//       if (err) {
//         return next(err)
//       }
//       res.redirect("/")
//     })
//   }
// )

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//   })
// )

router.post("/login", function(req, res, next) {
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
  passport.authenticate("local", function(error, user, info) {
    if (error) {
      res.status(401).send(error)
    } else if (!user) {
      res.status(401).send(info)
    } else {
      req.login(user, function(err) {
        if (err) {
          return next(err)
        }
        return res.json({ email: user.email })
      })
    }
  })(req, res)
})

router.post("/logout", function(req, res) {
  req.logout()
  res.send()
})

router.patch("/pin", function(req, res) {
  cache.deleteApp(req.body.appId)
  db.setPin(req.user.id, req.body.appId, req.body.shortcutId, req.body.isPinned)
  res.status(200).send()
})

export default router
