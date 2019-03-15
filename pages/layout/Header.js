import React from "react"
import Link from "next/link"
import styled from "styled-components"
import { connect } from "react-redux"

import Logo from "./Logo"
import Nav from "./Nav"

function Header({ user }) {
  return (
    <Container>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <Nav user={user} />
    </Container>
  )
}

function mapStateToProps(state) {
  const { user } = state
  return { user }
}

export default connect(mapStateToProps)(Header)

const Container = styled.header`
  display: flex;
  align-items: baseline;
  padding-top: 10px;
`
