import React from "react"

import styled from "styled-components"
import { colors } from "."

export default function Logo() {
  return (
    <H1>
      keyboard
      <span style={{ fontWeight: 700 }}>
        ninja<span style={{ color: colors.red, fontSize: "50px" }}>.</span>
        me
      </span>
    </H1>
  )
}

const H1 = styled.h1`
  color: ${colors.white};
  font-size: 30px;
  display: inline-block;
  cursor: pointer;
  font-weight: 300;
`
