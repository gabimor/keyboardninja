import React from "react"

import styled from "styled-components"
import { colors } from "../pages/layout"

const style = `
  display: inline-block;
  cursor:pointer;
  padding: 9px 15px 7px;
`

const PrimaryButton = styled.button`
  ${style}
  
  background-color: ${colors.darkRed};
  color: ${colors.white};
  border: 1px solid ${colors.darkRed};

  &:hover {
    background-color: ${colors.red};
    border-color: ${colors.red};
  }

  &:focus {
    outline: 1;
    outline-color: ${colors.lightRed};
  }
`

const SecondaryButton = styled.button`
  ${style}
  background:transparent;
  color: ${colors.lightGray};
  border: 1px solid ${colors.lightGray};

  &:hover {
    color: ${colors.white};
    border: 1px solid ${colors.white};
  }

  &:focus {
    outline: 1;
    outline-color: ${colors.lightGray};
  }
`

export default function Button({ children, secondary, style }) {
  return secondary ? (
    <SecondaryButton style={style}>{children}</SecondaryButton>
  ) : (
    <PrimaryButton style={style}>{children}</PrimaryButton>
  )
}
