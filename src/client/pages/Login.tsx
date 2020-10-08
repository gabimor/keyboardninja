import React from "react";
import styled from "@emotion/styled";

import LoginForm from "./login/LoginForm";

const Login = () => {
  return (
    <Container>
      <LoginForm />
    </Container>
  );
};

export default Login;

const Container = styled.div`
  width: 300px;
  margin: 100px auto 0 auto;
`;
