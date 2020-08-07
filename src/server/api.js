import passport from "passport"
import express from "express"
import { Types } from "mongoose"
import sgMail from "@sendgrid/mail"

import { UserShortcut } from "./models"
import * as db from "./db"
import * as cache from "./cache"
import md5 from "md5"

const router = express.Router()

router.post("/contactus", (req, res, next) => {
  const { name, email, message } = req.body
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: process.env.CONTACT_EMAIL,
    from: email,
    subject: "KeyboardNinja - from " + name,
    text: message,
  }
  sgMail.send(msg)
  res.sendStatus(200)
})

router.post("/getlink", async (req, res) => {
  const appsHash = await cache.getAppsHash()
  const { appId, shortcutIds } = req.body
  const appName = appsHash.find(e => e.id.toString() === appId).name

  let link = process.env.APP_URL + appName
  if (shortcutIds.length > 0) {
    const userShortcut = new UserShortcut({
      _id: Types.ObjectId(),
      appId,
      shortcuts: shortcutIds,
    })
    userShortcut.save()

    link += "?h=" + userShortcut._id

    cache.clearApp(appId)
  }

  res.status(200).send(link)
})

router.post("/signup", async (req, res, next) => {
  const { email, password } = req.body

  await db.signupUser(email, password)
  req.login({ email, password }, err => {
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

// router.post("/logout", (req, res) => {
//   req.logout()
//   res.send()
// })

// router.patch("/pin", function(req, res) {
//   const { appId, shortcutId, isPinned } = req.body

//   db.setPin(req.user.id, appId, shortcutId, isPinned)
//   cache.setPin(appId, shortcutId, isPinned)
//   req.session.pins = req.session.pins || 0
//   req.session.pins++

//   res.status(200).send()
// })

export default router
