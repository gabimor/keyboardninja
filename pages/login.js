import Layout from "./layout/Layout"
import styled from "styled-components"

import LoginForm from "./login/LoginForm"

const Login = () => {
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
  }

  return (
    <Layout>
      <Container>
        <LoginForm onSubmit={handleSubmit} />
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  width: 300px;
  margin: 100px auto 0 auto;
`

export default Login
