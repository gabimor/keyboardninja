import React from "react"

import styled from "styled-components"
import { colors } from "../pages/layout"

const ButtonLink = styled.a`
  color: ${colors.red};
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: ${colors.lightRed};
  }
`

export default ButtonLink
