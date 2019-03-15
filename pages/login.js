import Layout from "./layout/Layout"
import styled from "styled-components"
import { connect } from "react-redux"


import LoginForm from "./login/LoginForm"

const Login = ({a}) => {
  async function handleSubmit(email, password) {
    await fetch("/api/login", {
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

  console.log(a)
  return (
    <Layout>
      <Container>
        <LoginForm onSubmit={handleSubmit} />
      </Container>
    </Layout>
  )
}

function mapStateToProps(state) {
  const { a } = state
  return { a }
}

export default connect(mapStateToProps)(Login)

// Login.getInitialProps = async function (req) {
//   console.log("test")
//   console.log(req.user)
//   return {a:1}
// }

const Container = styled.div`
  width: 300px;
  margin: 100px auto 0 auto;
`

