import React, { useEffect } from "react";
import styled from "@emotion/styled";
import Header from "@client/components/Header";

import LoginForm from "./login/LoginForm";
import { getTitle } from "@shared/utils";

const Login = () => {
  useEffect(() => {
    document.title = getTitle("/login");
  }, []);

  return (
    <Container>
      <Header>Log in</Header>
      <LoginForm />
    </Container>
  );
};

export default Login;

const Container = styled.div`
  width: 300px;
  margin: 100px auto 0 auto;
`;
