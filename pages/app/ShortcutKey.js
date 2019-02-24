import React from "react"

import styled from "styled-components"
import { colors } from "../layout"

export default function ShortcutKey({ children }) {
  return <Container>{children}</Container>
}

const Container = styled("span")`
  display: inline-block;
  background-color: #635656;
  color: ${colors.white};

  font-size: 13px;
  border: solid 1px #442323;
  border-radius: 6px;
  padding: 0 2px;
  margin: 0 2px;
  min-width: 32px;
  text-align: center;
  box-shadow: 0px 6px 1px 1px rgba(30,30,30,0.2);
`
