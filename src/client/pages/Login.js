import React from "react"

import styled from "@emotion/styled"
// import { LOGIN } from "../redux/actions"
// import { login } from "../redux/actions"
// import { connect } from "react-redux"

import LoginForm from "./login/LoginForm"

const Login = ({ login }) => {
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
    const user = await res.json()

    // login(user)
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
