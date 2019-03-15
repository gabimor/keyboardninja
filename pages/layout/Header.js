import React from "react"
import Link from "next/link"
import styled from "styled-components"
import { connect } from "react-redux"

import { logout } from "../../redux/actions"

import Logo from "./Logo"
import Nav from "./Nav"

function Header({ user, logout }) {
  function handleLogout() {
    fetch("/api/logout", {
      method: "POST",
      headers: {
        credentials: "include",
        "Content-Type": "application/json",
      },
    })

    logout()
  }

  return (
    <Container>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <Nav user={user} onLogout={handleLogout} />
    </Container>
  )
}

function mapStateToProps(state) {
  const { user } = state
  return { user }
}

export default connect(
  mapStateToProps,
  {
    logout,
  }
)(Header)

const Container = styled.header`
  display: flex;
  align-items: baseline;
  padding-top: 10px;
`
