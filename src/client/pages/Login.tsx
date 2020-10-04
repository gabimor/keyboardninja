import React from "react";
import styled from "@emotion/styled";

import { login } from "@client/api/auth";
import LoginForm from "./login/LoginForm";
import { UserType } from "@src/types/User.type";

type FormData = Pick<UserType, "email" | "password">;

const Login = () => {
  async function handleSubmit({ email, password }: FormData) {
    await login(email, password);
  }

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit} />
    </Container>
  );
};

export default Login;

const Container = styled.div`
  width: 300px;
  margin: 100px auto 0 auto;
`;
