import React, { useState } from "react" // eslint-disable-line no-unused-vars
import Layout from "./client/Layout"
import { BrowserRouter } from "react-router-dom"
import { hydrate } from "react-dom"
import DataContext from "./client/DataContext"

const Client = () => {
  const doLogin = user => setUser(user)
  const doLogout = () => setUser()

  const { appCategories, app } = window.__KBN_DATA__

  const [user, setUser] = useState(window.__KBN_DATA__.user)

  const doPin = (shortcutId, pins, isPinned) => {
    const shortcut = app.shortcuts.find(e => e.id === shortcutId)
    shortcut.pins = pins
    shortcut.isPinned = isPinned
  }

  const contextValue = {
    app,
    appCategories,
    user,
    doLogin,
    doLogout,
    doPin,
  }

  return (
    <DataContext.Provider value={contextValue}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </DataContext.Provider>
  )
}

hydrate(<Client />, document.getElementById("root"))

if (module.hot) {
  module.hot.accept()
}
