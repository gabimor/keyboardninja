import React, { useEffect } from "react";
import styled from "@emotion/styled";
import Title from "@client/components/Title";

import SignupForm from "./signup/SignupForm";
import { getTitle } from "@shared/utils";
import { Link } from "react-router-dom";

const Signup = () => {
  useEffect(() => {
    document.title = getTitle("/signup");
  }, []);

  return (
    <Container>
      <Title>Sign up</Title>
      <SignupForm />
      <SignupWrapper>
        Already have an account ?<Link to="/login"> Log in</Link>
      </SignupWrapper>
    </Container>
  );
};

export default Signup;

const Container = styled.div`
  width: 300px;
  margin: 100px auto 0 auto;
`;

const SignupWrapper = styled.div`
  text-align: center;
  margin-top: 20px;
  color: #e9e5e5;
`;
