import Layout from "./layout/Layout"
import styled from "styled-components"
import { LOGIN } from "../redux/actions"
import { login } from "../redux/actions"
import { connect } from "react-redux"

import LoginForm from "./login/LoginForm"

const Login = ({login}) => {
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

    login(user)
  }

  
  return (
    <Layout>
      <Container>
        <LoginForm onSubmit={handleSubmit} />
      </Container>
    </Layout>
  )
}

export default connect(
  null,
  { login }
)(Login)

const Container = styled.div`
  width: 300px;
  margin: 100px auto 0 auto;
`
