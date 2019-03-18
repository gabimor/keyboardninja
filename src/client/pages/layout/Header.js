import React, { useContext } from "react" // eslint-disable-line no-unused-vars
import { Link } from "react-router-dom"
import styled from "@emotion/styled"
import DataContext from "../../DataContext"

import Logo from "./Logo"
import Nav from "./Nav"

function Header() {
  const { user, doLogout } = useContext(DataContext)

  function handleLogout() {
    fetch("/api/logout", {
      method: "POST",
      headers: {
        credentials: "include",
        "Content-Type": "application/json",
      },
    })

    doLogout()
  }

  return (
    <Container>
      <Link to="/">
        <Logo />
      </Link>
      <Nav user={user} onLogout={handleLogout} />
    </Container>
  )
}

export default Header

const Container = styled.header`
  display: flex;
  align-items: baseline;
  padding-top: 10px;
`
