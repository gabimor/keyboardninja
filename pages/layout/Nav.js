import React from "react"

import styled from "styled-components"
import Link from "next/link"

const Container = styled.div`
  display: inline-block;
  margin-left: 30px;
  font-size: 24px;
`

export default () => (
  <Container>
    <Link href="/add">Edit</Link>
    <Link href="/apps">Apps</Link>
    <Link href="/about">About</Link>
  </Container>
)
