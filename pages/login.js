import Layout from "./layout/Layout"
import styled from "styled-components"

import LoginForm from "./login/LoginForm"

const Login = () => {
  async function handleSubmit() {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
    console.log(res)
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
