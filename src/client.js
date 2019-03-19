import React, { useState } from "react" // eslint-disable-line no-unused-vars
import Layout from "./client/Layout"
import { BrowserRouter } from "react-router-dom"
import { hydrate } from "react-dom"
import DataContext from "./client/DataContext"

const Client = () => {
  function doLogin(user) {
    setUser(user)
  }

  function doLogout() {
    setUser()
  }

  function doSetUserApp(userApp) {
    setUserApp(userApp)
  }

  const [userApp, setUserApp] = useState([])
  const [user, setUser] = useState(window.__KBN_DATA__.user)
  const contextValue = {
    ...window.__KBN_DATA__,
    user,
    userApp,
    doLogin,
    doLogout,
    doSetUserApp,
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
