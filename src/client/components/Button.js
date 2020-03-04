import React from "react" // eslint-disable-line no-unused-vars
import PropTypes from "prop-types"

import styled from "@emotion/styled"

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
  color: #ffffff;
  border: 1px solid #d1403d;

  &:hover {
    background-color: #e86562;
  }
`

const SecondaryButton = styled.button`
  ${style}
  background:transparent;
  color: #a4a3a6;
  border: 1px solid #a4a3a6;

  &:hover {
    background: #9d8b8b;
  }
`
