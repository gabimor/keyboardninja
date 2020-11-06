import React, { useEffect } from "react";
import styled from "@emotion/styled";
import Title from "@client/components/Title";
import { Link } from "react-router-dom";

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
      <SignupWrapper>
        Don't have an account ?<Link to="/signup"> Sign up</Link>
      </SignupWrapper>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  width: 300px;
  margin: 100px auto 0 auto;
`;

const SignupWrapper = styled.div`
  text-align: center;
  margin-top: 20px;
  color: #e9e5e5;
`;
