import React from "react"

import styled from "styled-components"
import PropTypes from "prop-types"

import { upperFirstLetter } from "../../helpers"
import Shortcut from "./Shortcut"
import { colors } from "../layout"
import Pin from "./Pin"

function ShortcutItem({ action, keys, pins, isPinned }) {
  return (
    <Container>
      <PinContainer>
        <Pin isPinned={isPinned} count={pins} />
      </PinContainer>
      <td>{upperFirstLetter(action)}</td>
      <KeysContainer>
        <Shortcut keys={keys} />
      </KeysContainer>
    </Container>
  )
}

ShortcutItem.propTypes = {
  action: PropTypes.string.isRequired,
  keys: PropTypes.array.isRequired,
}

export default ShortcutItem

const Container = styled.tr`
  background: ${colors.panel};
  font-weight: 300;
`

const PinContainer = styled.td`
  width: 1%;
  text-align: center;
  padding: 6px 18px 6px 18px;
`

const KeysContainer = styled.td`
  width: 1%;
  padding-right: 13px;
`
