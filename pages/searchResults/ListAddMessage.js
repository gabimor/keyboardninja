import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { colors } from "../layout"
import ButtonLink from "../../components/ButtonLink"

const Container = styled.span`
  color: ${colors.panelZebra};
  font-size: 13px;
  margin-left: auto;
`

export default function Shortcut({ listSize, onAdd }) {
  let message = ""

  if (listSize < 3) {
    message =
      Math.random() > 0.7
        ? "Not a lot going on here ah… maybe "
        : "It's lonely at the top… maybe "

    return (
      <Container>
        {message}
        <ButtonLink onClick={onAdd}>add some shortcuts ?</ButtonLink>
      </Container>
    )
  } else {
    return (
      <Container>
        Missing your favorite shortcuts? why not&nbsp;
        <ButtonLink onClick={onAdd}>add them ?</ButtonLink>
      </Container>
    )
  }
}

Shortcut.propTypes = {
  listSize: PropTypes.number,
}
