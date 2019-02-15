import React from "react"
import Link from "next/link"
import styled from "styled-components"

import Logo from "./Logo"
import Nav from "./Nav"

function Header() {
  return (
    <Container>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <Nav />
    </Container>
  )
}

export default Header

const Container = styled.header`
  display: flex;
  align-items: baseline;
  padding-top: 10px;
`
