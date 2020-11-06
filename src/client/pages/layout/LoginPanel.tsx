import React, { useContext } from "react";
import LoginForm from "../login/LoginForm";
import Title from "@client/components/Title";
import styled from "@emotion/styled";
import { DataContext } from "@client/DataContext";
import { LoginModalState } from "@client/store";

export default () => {
  const store = useContext(DataContext);

  return (
    <>
      <Title>Log in</Title>
      <LoginMessage>Log in and save your favorite shortcuts! ⚡️</LoginMessage>
      <LoginForm />
      <SignupWrapper>
        Don't have an account ?
        <a onClick={() => store.setLoginModalState(LoginModalState.Signup)}>
          {" "}
          Sign up
        </a>
      </SignupWrapper>
    </>
  );
};

const LoginMessage = styled.div`
  font-weight: 300;
  margin-bottom: 30px;
  text-align: center;
  font-size: 16px;
  color: #e9e5e5;
`;

const SignupWrapper = styled.div`
  text-align: center;
  margin-top: 20px;
  color: #e9e5e5;
`;
