import React, { Fragment } from "react"

import styled from "@emotion/styled"
import { Link } from "react-router-dom"
import Button from "../../components/Button"

function Anonymous() {
  return (
    <Fragment>
      <li>
        <Link to="/login">Log In</Link>
      </li>
      <li>
        {/* <Link href="/signup"> */}
        <Button>Sign Up</Button>
        {/* </Link> */}
      </li>
    </Fragment>
  )
}

function LoggedIn({ user, onLogout }) {
  return (
    <Fragment>
      <li>
        {/* <Link href="/login"> */}
        <a>Hello {user.email} </a>
        {/* </Link> */}
      </li>
      <li>
        {/* <Link href="/apps"> */}
        <a>My apps</a>
        {/* </Link> */}
      </li>
      <li>
        <a onClick={onLogout}>Logout</a>
      </li>
    </Fragment>
  )
}

export default props => (
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
