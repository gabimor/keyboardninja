import React, { useEffect } from "react";
import styled from "@emotion/styled";
import Header from "@client/components/Header";

import SignupForm from "./signup/SignupForm";
import { getTitle } from "@src/shared/utils";

const Signup = () => {
  useEffect(() => {
    document.title = getTitle("/signup");
  }, []);

  return (
    <Container>
      <Header>Sign up</Header>
      <SignupForm />
    </Container>
  );
};

export default Signup;

const Container = styled.div`
  width: 300px;
  margin: 100px auto 0 auto;
`;
