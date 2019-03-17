const passport = require("passport")
const router = require("express").Router()

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

router.get("/apps/:id", (req, res) => {
  res.json(global.apps.find(e => e.id === +req.params.id))
})

router.get("/app_categories", (req, res) => {
  res.json(global.appCategories)
})

module.exports = router

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
  console.log(123)
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

// server.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//     failureFlash: true,
//   })
// )
