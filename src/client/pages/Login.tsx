import React, { useEffect } from "react";
import styled from "@emotion/styled";
import Title from "@client/components/Title";

import LoginForm from "./login/LoginForm";
import { getTitle } from "@shared/utils";

const Login = () => {
  useEffect(() => {
    document.title = getTitle("/login");
  }, []);

  return (
    <Container>
      <Title>Log in</Title>
      <LoginForm />
    </Container>
  );
};

export default Login;

const Container = styled.div`
  width: 300px;
  margin: 100px auto 0 auto;
`;
