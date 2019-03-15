// const redisClient = require("redis").createClient()
// const db = require("./db")

// function getAppCategories() {
//   let appCategories = redisClient.get("appCategories")

//   if (appCategories) return appCategories
//   else {
//     appCategories = db.getAppCategories()
//     redisClient.set(appCategories, JSON.stringify(app))
//     return appCategories
//   }
// }

// function getApps() {

// }


// module.exports = {
//   getApps,
//   getAppCategories
// }