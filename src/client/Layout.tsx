import React from "react";
import styled from "@emotion/styled";
import { Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import App from "./pages/App";
import Login from "./pages/Login";
import Header from "./pages/layout/Header";
import Footer from "./pages/layout/Footer";
import Signup from "./pages/Signup";
import ContactUs from "./pages/ContactUs";
import Page404 from "./pages/404";

const Layout = () => {
  return (
    <div>
      <Container>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/contact" component={ContactUs} />
          <Route path="/404" component={Page404} />
          <Route path="/:name" component={App} />
          <Route component={Page404} />
        </Switch>
        <Footer />
      </Container>
    </div>
  );
};

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 30px;

  @media (max-width: 992px) {
    padding: 20px;
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export default Layout;
