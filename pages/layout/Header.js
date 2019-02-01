import React from "react"

import styled from "styled-components"
import Link from "next/link"
import { colors } from "."
import Logo from "./Logo"
import Nav from "./Nav"

const Container = styled.div`
  color: ${colors.white};
  display:inline-block;
`

export default () => (
  <Container>
    <Logo />    
    <Nav/>
  </Container>
)
