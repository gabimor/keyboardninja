import React, { useContext } from "react";
import styled from "@emotion/styled";

import { DataContext } from "../DataContext";
import { signup } from "@client/api/auth";
import { UserType } from "@src/types/User.type";
import SignupForm from "./signup/SignupForm";

type SubmitData = Pick<UserType, "email" | "password">;

const Signup = () => {
  const { doLogin } = useContext(DataContext);

  async function handleSubmit({ email, password }: SubmitData) {
    const userJson = await signup(email, password);
    doLogin(userJson);
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
