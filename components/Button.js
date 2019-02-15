import React from "react"
import PropTypes from "prop-types"

import styled from "styled-components"
import { colors } from "../pages/layout"

export default function Button({ children, secondary, style, onClick }) {
  return secondary ? (
    <SecondaryButton style={style} onClick={onClick}>
      {children}
    </SecondaryButton>
  ) : (
    <PrimaryButton style={style} onClick={onClick}>
      {children}
    </PrimaryButton>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
}

const style = `
  display: inline-block;
  cursor:pointer;
  color: ${colors.softText};
  padding: 8px 15px;
  border-radius: 4px;
  line-height: 100%;
`

const PrimaryButton = styled.button`
  ${style}
  
  background-color: ${colors.darkRed};
  color: ${colors.white};
  border: 1px solid ${colors.darkRed};

  &:hover {
    background-color: ${colors.red};
  }
`

const SecondaryButton = styled.button`
  ${style}
  background:transparent;
  color: ${colors.lightGray};
  border: 1px solid ${colors.lightGray};

  &:hover {
    background: ${colors.labelText};
  }
`
