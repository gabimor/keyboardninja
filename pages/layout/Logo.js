import React from "react"

import styled from "styled-components"
import Link from "next/link"
import { colors } from "."

const H1 = styled.h1`
  color: ${colors.white};
  font-size: 30px;
  display: inline-block;
  cursor: pointer;
`

export default function Logo() {
  return (
    <H1>
      <Link href="/">
        <>
          keyboard
          <span style={{ fontWeight: 700 }}>
            ninja<span style={{ color: colors.red, fontSize: "50px" }}>.</span>
            me
          </span>
        </>
      </Link>
    </H1>
  )
}
