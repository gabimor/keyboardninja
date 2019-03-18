import React, { useContext } from "react" // eslint-disable-line no-unused-vars
import DataContext from "../DataContext"

import styled from "@emotion/styled"

import LoginForm from "./login/LoginForm"

const Login = () => {
  const { doLogin } = useContext(DataContext)

  async function handleSubmit(email, password) {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        credentials: "include",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    const userJson = await res.json()
    doLogin(userJson)
  }

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit} />
    </Container>
  )
}

// export default connect(
//   null,
//   { login }
// )(Login)
export default Login

const Container = styled.div`
  width: 300px;
  margin: 100px auto 0 auto;
`
