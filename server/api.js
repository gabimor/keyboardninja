const express = require("express")
const passport = require("passport")
const router = express.Router()

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//   })
// )

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res, next) => {
    req.session.save(err => {
      if (err) {
        return next(err)
      }
      res.redirect("/")
    })
  }
)

// router.post(
//   "/login",
//   function(req, res, next) {
//     // passport.authenticate(
//     //   "local",
//     //   {
//     //     successRedirect: "/",
//     //     failureRedirect: "/login",
//     //   },
//     //   function(req, res) {
//     //     // If this function gets called, authentication was successful.
//     //     // `req.user` contains the authenticated user.
//     //     res.redirect("/users/" + req.user.username)
//     //   }
//     // )

//     passport.authenticate("local", function(error, user, info) {
//       if (error) {
//         res.status(401).send(error)
//       } else if (!user) {
//         res.status(401).send(info)
//       } else {
//         req.login(user, function(err) {
//           if (err) {
//             return next(err)
//           }
//           console.log("logging in")
//           console.log(user)
//           return res.status(200).send()
//         })
//       }
//     })(req, res)
//   },

//   // function to call once successfully authenticated
//   function(req, res) {
//     res.status(200).send("logged in!")
//   }
// )

// server.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//     failureFlash: true,
//   })
// )

router.get("/apps/:id", (req, res) => {
  res.json(apps.find(e => e.id === +req.params.id))
})

router.get("/user", (req, res) => {
  res.send(req.user)
})

router.get("/app_categories", (req, res) => {
  res.json(appCategories)
})

module.exports = router
