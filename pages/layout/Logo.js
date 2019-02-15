import React from "react"

import styled from "styled-components"
import { colors } from "."

export default function Logo() {
  return (
    <H1>
      keyboard
      <span style={{ fontWeight: 700 }}>
        ninja<Dot>.</Dot>
        me
      </span>
    </H1>
  )
}

const H1 = styled.h1`
  color: ${colors.white};
  font-size: 25px;
  display: inline-block;
  cursor: pointer;
  font-weight: 300;
`

const Dot = styled.span`
  color: ${colors.red};
  font-size: 1.35em;
`
