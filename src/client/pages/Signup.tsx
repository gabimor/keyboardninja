import React from "react";
import styled from "@emotion/styled";

import { signup } from "@client/api/auth";
import { UserType } from "@src/types/User.type";
import SignupForm from "./signup/SignupForm";

type SubmitData = Pick<UserType, "email" | "password">;

const Signup = () => {
  async function handleSubmit({ email, password }: SubmitData) {
    await signup(email, password);
  }

  return (
    <Container>
      <SignupForm onSubmit={handleSubmit} />
    </Container>
  );
};

export default Signup;

const Container = styled.div`
  width: 300px;
  margin: 100px auto 0 auto;
`;
