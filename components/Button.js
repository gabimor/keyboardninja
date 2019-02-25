import React from "react"
import PropTypes from "prop-types"

import styled from "styled-components"

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
  color: #E9E5E5;
  padding: 8px 15px;
  border-radius: 4px;
  line-height: 100%;
`

const PrimaryButton = styled.button`
  ${style}

  background-color: #D1403D;
  color: #FFFFFF;
  border: 1px solid #d1403d;

  &:hover {
    background-color: #e86562;
  }
`

const SecondaryButton = styled.button`
  ${style}
  background:transparent;
  color: #A4A3A6;
  border: 1px solid #A4A3A6;

  &:hover {
    background: #9d8b8b;
  }
`
