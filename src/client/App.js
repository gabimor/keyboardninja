import React from "react"
import styled from "@emotion/styled"
import { Route, Switch } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Header from "./pages/layout/Header"
import Footer from "./pages/layout/Footer"
import Theme from "./pages/layout"
import Overlay from "./pages/layout/Overlay"

const App = overlay => (
  <div>
    <Theme />
    {/* {overlay && <Overlay />} */}
    <Container>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
      </Switch>
      <Footer />
    </Container>
  </div>
)

const Container = styled.div`
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 30px;
`

export default App
