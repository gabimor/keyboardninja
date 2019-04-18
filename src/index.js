import http from "http"

let app = require("./server").default

const server = http.createServer(app)

let currentApp = app

console.log(process.env.PORT)

server.listen(process.env.PORT || 3000, error => {
  console.log(process.env.PORT)
  if (error) {
    console.log(error)
  }

  console.log("server started")
})

if (module.hot) {
  console.log("✅  Server-side HMR Enabled!")

  module.hot.accept("./server", () => {
    console.log("🔁  HMR Reloading `./server`...")

    try {
      app = require("./server").default
      server.removeListener("request", currentApp)
      server.on("request", app)
      currentApp = app
    } catch (error) {
      console.error(error)
    }
  })
}
