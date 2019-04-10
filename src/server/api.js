import passport from "passport"
import express from "express"

import * as db from "./db"
import * as cache from "./cache"
import md5 from "md5"

const router = express.Router()

router.post("/signup", async function(req, res, next) {
  const { email, password } = req.body

  await db.signupUser(email, password)
  req.login({ email, password }, function(err) {
    if (err) {
      return next(err)
    }
    return res.json({ email })
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
  const { appId, shortcutId, isPinned } = req.body

  // db.setPin(req.user.id, appId, shortcutId, isPinned)
  // cache.setPin(appId, shortcutId, isPinned)
  req.session.pins = req.session.pins || 0
  req.session.pins++
  console.log(req.session.pins)

  res.status(200).send()
})

router.post("/getlink", function(req, res) {
  const { appId, shortcutIds } = req.body  
  const hash = md5(req.sessionId + shortcutIds.join())  
  res.status(200).send({ hash })
})

export default router
