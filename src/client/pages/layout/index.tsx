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
import ContactUs from "../ContactUs";
import Page404 from "../404";
import Modal from "@client/components/Modal";
import LoginForm from "../login/LoginForm";
import Title from "@client/components/Title";

import { tabletBreakpoint, desktopBreakpoint, siteWidth } from "../../consts";
import { DataContext } from "@client/DataContext";

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
          <Route exact path="/contact" component={ContactUs} />
          <Route path="/404" component={Page404} />
          <Route path="/:name" component={App} />
          <Route component={Page404} />
        </Switch>
        <Modal
          isOpen={store.loginModalVisible}
          onRequestClose={() => store.setLoginModalVisible(false)}
          contentLabel="Example Modal"
        >
          <Title>Log in</Title>
          <LoginMessage>
            Log in and save your favorite shortcuts! ⚡️
          </LoginMessage>
          <LoginForm />
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

const LoginMessage = styled.div`
  font-weight: 300;
  margin-bottom: 30px;
  text-align: center;
  font-size: 16px;
  color: #e9e5e5;
`;

export default observer(Layout);
