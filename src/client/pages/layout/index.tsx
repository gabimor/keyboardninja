import React, { useContext } from "react";
import styled from "@emotion/styled";
import { Route, Switch } from "react-router-dom";
import { observer } from "mobx-react-lite";

import Home from "../Home";
import App from "../App";
import Login from "../Login";
import Header from "./Header";
import Footer from "./Footer";
import Signup from "../Signup";
import About from "../About";
import Modal from "@client/components/Modal";

import { tabletBreakpoint, desktopBreakpoint, siteWidth } from "../../consts";
import { DataContext } from "@client/DataContext";
import LoginPanel from "./LoginPanel";
import SignupPanel from "./SignupPanel";
import { LoginModalState } from "@client/store";

const Layout = () => {
  const store = useContext(DataContext);
  return (
    <div>
      <Container>
        <Header />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/about" component={About} />
          <Route path="/:name" component={App} />
        </Switch>
        <Modal
          isOpen={store.loginModalState === LoginModalState.Login}
          onRequestClose={() => store.setLoginModalState(LoginModalState.None)}
        >
          <LoginPanel />
        </Modal>

        <Modal
          isOpen={store.loginModalState === LoginModalState.Signup}
          onRequestClose={() => store.setLoginModalState(LoginModalState.None)}
        >
          <SignupPanel />
        </Modal>

        <Footer />
      </Container>
    </div>
  );
};

const Container = styled.div`
  max-width: ${siteWidth}px;
  margin: 0 auto;
  padding: 0 30px;

  @media (max-width: ${desktopBreakpoint}px) {
    padding: 20px;
  }

  @media (max-width: ${tabletBreakpoint}px) {
    padding: 10px;
  }
`;

export default observer(Layout);
