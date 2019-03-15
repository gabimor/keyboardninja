import React from "react"

import styled from "styled-components"
import Link from "next/link"
import Button from "../../components/Button"

function Anonymous() {
  return (
    <>
      <li>
        <Link href="/login">
          <a>Log In</a>
        </Link>
      </li>
      <li>
        <Link href="/signup">
          <Button>Sign Up</Button>
        </Link>
      </li>
    </>
  )
}

function LoggedIn({ user, onLogout }) {
  return (
    <>
      <li>
        <Link href="/login">
          <a>Hello {user.email} </a>
        </Link>
      </li>
      <li>
        <Link href="/apps">
          <a>My apps</a>
        </Link>
      </li>
      <li>
        <a onClick={onLogout}>Logout</a>
      </li>
    </>
  )
}

export default (props) => (
  <Container>
    <li>
      <a>Suggest An App</a>
    </li>
    {props.user ? <LoggedIn {...props} /> : <Anonymous />}
  </Container>
)

const Container = styled.ul`
  display: inline-block;
  font-size: 14px;
  font-weight: 300;
  list-style: none;
  margin-left: auto;

  li {
    padding-left: 20px;
    display: inline-block;
  }

  a {
    color: #ffffff;
  }
`
