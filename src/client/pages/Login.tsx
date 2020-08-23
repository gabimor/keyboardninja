import React, { useContext } from "react";
import styled from "@emotion/styled";

import { login } from "@client/api/auth";
import { DataContext } from "../DataContext";
import LoginForm from "./login/LoginForm";
import { UserType } from "@src/types/User.type";

type FormData = Pick<UserType, "email" | "password">;

const Login = () => {
  const { doLogin } = useContext(DataContext);

  async function handleSubmit({ email, password }: FormData) {
    const userJson = await login(email, password);
    doLogin(userJson);
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
