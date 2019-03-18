import React from "react" // eslint-disable-line no-unused-vars
import App from "./client/App"
import { BrowserRouter } from "react-router-dom"
import { hydrate } from "react-dom"

hydrate(
  <BrowserRouter>
    <App appCategories={window.__KBN_DATA__} />
  </BrowserRouter>,
  document.getElementById("root")
)

if (module.hot) {
  module.hot.accept()
}
