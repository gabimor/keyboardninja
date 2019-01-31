import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { colors } from "../layout/GlobalStyle"

const Container = styled.span`
  color: ${colors.panelZebra};
  font-size: 13px;
  margin-left: auto;
`

export default function Shortcut({ listSize }) {
  let message = "Missing your favorite shortcuts?"

  if (listSize < 3) {
    message =
      Math.random() > 0.7
        ? "Not a lot going on here ah… maybe "
        : "It's lonely at the top… maybe"

    return <Container>{message}</Container>
  }
  
  return <Container>{message}</Container>
}

Shortcut.propTypes = {
  listSize: PropTypes.number,
}
