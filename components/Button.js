import React from "react"

import styled from "styled-components"
import { colors } from "../pages/layout"

const Container = styled("button")`
  display: inline-block;
  background-color: ${colors.darkRed};
  color: ${colors.white};

  padding: 7px 15px;
  font-weight:100;
  font-size:20px;
  border:none;

  &:hover {
    background-color: ${colors.red};
  }
`

export default function Button({ children }) {
  return <Container>{children}</Container>
}
