import React from "react";
import styled from "@emotion/styled";

import SignupForm from "./signup/SignupForm";

const Signup = () => {
  return (
    <Container>
      <SignupForm />
    </Container>
  );
};

export default Signup;

const Container = styled.div`
  width: 300px;
  margin: 100px auto 0 auto;
`;
