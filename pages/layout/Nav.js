import React from "react"

import styled from "styled-components"
import Link from "next/link"
import Button from "../../components/Button"

export default () => (
  <Container>
    <li>
      <a>Suggest An App</a>
    </li>
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
  </Container>
)

const Container = styled.ul`
  display: inline-block;
  font-size: 14px;
  font-weight: 300;
  list-style: none;
  margin-left: auto;

  & li {
    padding-left: 20px;
    display: inline-block;
  }
`
