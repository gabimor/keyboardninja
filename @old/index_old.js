import http from "http"

let app = require("./server_old").default

const server = http.createServer(app)

let currentApp = app

server.listen(process.env.PORT || 3000, error => {
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
      app = require("./server_old").default
      server.removeListener("request", currentApp)
      server.on("request", app)
      currentApp = app
    } catch (error) {
      console.error(error)
    }
  })
}
 