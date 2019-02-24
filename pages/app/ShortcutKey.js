import React from "react"

import styled from "styled-components"
import { colors } from "../layout"

export default function ShortcutKey({ children }) {
  return <Container>{children}</Container>
}

const Container = styled("span")`
  display: inline-block;
  background-color: ${colors.red};
  color: ${colors.white};

  font-size: 13px;
  border: solid 1px ${colors.darkRed};
  border-radius: 6px;
  margin: 0 2px;
  min-width: 32px;
  text-align: center;
`
