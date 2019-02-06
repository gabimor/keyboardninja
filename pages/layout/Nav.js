import React from "react"

import styled from "styled-components"
import Link from "next/link"

export default () => (
  <Container>
    <li>
      <Link href="/apps">
        <a>Apps</a>
      </Link>
    </li>
    <li>
      <Link href="/about">
        <a>About</a>
      </Link>
    </li>
  </Container>
)

const Container = styled.ul`
  display: inline-block;
  margin-left: 20px;
  font-size: 20px;
  font-weight: 300;
  list-style: none;

  & li {
    padding-left: 20px;
    display: inline-block;
  }
`
