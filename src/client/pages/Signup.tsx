import React, { useEffect } from "react";
import styled from "@emotion/styled";
import Title from "@client/components/Title";

import SignupForm from "./signup/SignupForm";
import { getTitle } from "@shared/utils";

const Signup = () => {
  useEffect(() => {
    document.title = getTitle("/signup");
  }, []);

  return (
    <Container>
      <Title>Sign up</Title>
      <SignupForm />
    </Container>
  );
};

export default Signup;

const Container = styled.div`
  width: 300px;
  margin: 100px auto 0 auto;
`;
