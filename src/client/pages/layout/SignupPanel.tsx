import React, { useContext } from "react";
import SignupForm from "../signup/SignupForm";
import Title from "@client/components/Title";
import styled from "@emotion/styled";
import { DataContext } from "@client/DataContext";
import { LoginModalState } from "@client/store";

export default () => {
  const store = useContext(DataContext);

  return (
    <>
      <Title>Sign up</Title>
      <SignupForm />
      <SignupWrapper>
        Already have an account ?
        <a onClick={() => store.setLoginModalState(LoginModalState.Login)}>
          {" "}
          Log in
        </a>
      </SignupWrapper>
    </>
  );
};

const SignupWrapper = styled.div`
  text-align: center;
  margin-top: 20px;
  color: #e9e5e5;
`;
