import React from "react" // eslint-disable-line no-unused-vars

import styled from "@emotion/styled"

export default function Logo() {
  return (
    <H1>
      keyboard
      <span style={{ fontWeight: 700 }}>
        ninja<Dot>.</Dot>
        me
      </span>
      <Beta> Beta</Beta>
    </H1>
  )
}

const Beta = styled.small`
  font-size: 10px;
`

const H1 = styled.h1`
  color: #ffffff;
  font-size: 30px;
  display: inline-block;
  cursor: pointer;
  font-weight: 300;
  position: relative;

  @media (max-width: 992px) {
    font-size: 25px;
  }

  @media (max-width: 768px) {
    font-size: 20px;
  }
`

const Dot = styled.span`
  color: #e86562;
  font-size: 1.35em;
`
