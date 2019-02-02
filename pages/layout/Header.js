import React from "react"
import Link from "next/link"
import styled from "styled-components"

import Logo from "./Logo"
import Nav from "./Nav"
import OSSelect from "./OSSelect"

const Container = styled.div`
  display: flex;
  align-items: baseline;
  padding: 26px 36px 104px 30px;
`

export default () => (
  <Container>
    <Link href="/">
      <a>
        <Logo />
      </a>
    </Link>
    <Nav />
    <OSSelect os="win" />
  </Container>
)
