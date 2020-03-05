import React, { useState } from "react" // eslint-disable-line no-unused-vars
import { BrowserRouter } from "react-router-dom"
import { hydrate } from "react-dom"

import * as osSelect from "./client/helpers/osSelect"
import Layout from "./client/Layout"
import DataContext from "./client/DataContext"

const Client = () => {
  const doLogin = user => setUser(user)
  const doLogout = () => setUser()
  const doSetOs = os => {
    setOs(os)
    osSelect.setSelectedOS(os)
  }
  const doPin = (shortcutId, pins, isPinned) => {
    const shortcut = app.shortcuts.find(
      e => e._id.toString() === shortcutId.toString()
    )
    shortcut.pins = pins
    shortcut.isPinned = isPinned
  }

  const { appCategories, app } = window.__KBN_DATA__

  const [os, setOs] = useState(window.__KBN_DATA__.os)
  const [user, setUser] = useState(window.__KBN_DATA__.user)


  const contextValue = {
    app,
    appCategories,
    user,
    os,
    doLogin,
    doLogout,
    doPin,
    doSetOs,
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
