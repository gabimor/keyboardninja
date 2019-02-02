import React from "react"

import styled from "styled-components"
import { colors } from "../pages/layout"

const style = `
  display: inline-block;
  cursor:pointer;
  padding: 7px 15px 6px;
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
`

export default function Button({ children, secondary }) {
  return secondary ? <SecondaryButton>{children}</SecondaryButton> : <PrimaryButton>{children}</PrimaryButton>
}
