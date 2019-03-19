import React, { useContext } from "react" // eslint-disable-line no-unused-vars
import DataContext from "../DataContext"

import styled from "@emotion/styled"

import SignupForm from "./signup/SignupForm"

const Signup = () => {
  const { doLogin } = useContext(DataContext)

  async function handleSubmit(email, password) {
    const res = await fetch("/api/signup", {
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
      <SignupForm onSubmit={handleSubmit} />
    </Container>
  )
}

export default Signup

const Container = styled.div`
  width: 300px;
  margin: 100px auto 0 auto;
`
