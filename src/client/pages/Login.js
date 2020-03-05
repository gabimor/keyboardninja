import React, { useContext } from "react" // eslint-disable-line no-unused-vars
import styled from "@emotion/styled"

import { login } from "../helpers/api"
import DataContext from "../DataContext"
import LoginForm from "./login/LoginForm"

const Login = () => {
  const { doLogin } = useContext(DataContext)

  async function handleSubmit(email, password) {
    const userJson = await login(email, password)
    doLogin(userJson)
  }

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit} />
    </Container>
  )
}

export default Login

const Container = styled.div`
  width: 300px;
  margin: 100px auto 0 auto;
`
