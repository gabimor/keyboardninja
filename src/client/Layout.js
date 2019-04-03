import React from "react" // eslint-disable-line no-unused-vars
import styled from "@emotion/styled"
import { Route, Switch } from "react-router-dom"

import Home from "./pages/Home"
import App from "./pages/App"
import Login from "./pages/Login"
import Header from "./pages/layout/Header"
import Footer from "./pages/layout/Footer"
import Signup from "./pages/Signup"
import MyApps from "./pages/MyApps"
import Page404 from "./pages/404"

const Layout = () => {
  return (
    <div>
      <Container>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route ex act path="/signup" component={Signup} />
          <Route exact path="/apps" component={MyApps} />
          <Route path="/:name" component={App} />
          <Route component={Page404} />
        </Switch>
        <Footer />
      </Container>
    </div>
  )
}

const Container = styled.div`
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 30px;
`

export default Layout
