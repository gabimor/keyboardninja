import React, { Fragment } from "react" // eslint-disable-line no-unused-vars

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
        <Link to="/signup">
          <Button>Sign Up</Button>
        </Link>
      </li>
    </Fragment>
  )
}

function LoggedIn({ user, onLogout }) {
  return (
    <Fragment>
      <li>{user.email}</li>
      <li>
        <Link to="/apps">My apps</Link>
      </li>
      <li>
        <a onClick={onLogout}>Logout</a>
      </li>
    </Fragment>
  )
}

export default props => (
  <Container>{props.user ? <LoggedIn {...props} /> : <Anonymous />}</Container>
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
