import React from "react"

import styled from "styled-components"

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
  color: #FFFFFF;
  font-size: 25px;
  display: inline-block;
  cursor: pointer;
  font-weight: 300;
`

const Dot = styled.span`
  color: #e86562;
  font-size: 1.35em;
`
