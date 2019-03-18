import React from "react" // eslint-disable-line no-unused-vars
import Layout from "./client/Layout"
import { BrowserRouter } from "react-router-dom"
import { hydrate } from "react-dom"
import DataContext from "./client/DataContext"

hydrate(
  <DataContext.Provider value={window.__KBN_DATA__}>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </DataContext.Provider>,
  document.getElementById("root")
)

if (module.hot) {
  module.hot.accept()
}
