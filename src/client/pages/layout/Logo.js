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
      <Alpha>Alpha</Alpha>
    </H1>
  )
}

const Alpha = styled.small`
  position: absolute;
  right: 0;
  bottom: -21px;
  font-size:10px;
`

const H1 = styled.h1`
  color: #ffffff;
  font-size: 30px;
  display: inline-block;
  cursor: pointer;
  font-weight: 300;
  position: relative;

  @media (max-width: 992px) {
    font-size: 20px;
  }
`

const Dot = styled.span`
  color: #e86562;
  font-size: 1.35em;
`
