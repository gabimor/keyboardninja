import React from "react"

import styled from "styled-components"
import PropTypes from "prop-types"

import { upperFirstLetter } from "../../helpers"
import Shortcut from "./Shortcut"
import Pin from "./Pin"

function ShortcutItem({ action, keys, pins, isPinned }) {
  return (
    <Container>
      <PinContainer>
        <Pin isPinned={isPinned} count={pins} />
      </PinContainer>
      <ActionContainer isPinned={isPinned}>{upperFirstLetter(action)}</ActionContainer>
      <KeysContainer>
        <Shortcut keys={keys} />
      </KeysContainer>
    </Container>
  )
}

ShortcutItem.propTypes = {
  action: PropTypes.string.isRequired,
  keys: PropTypes.string.isRequired,
}

export default ShortcutItem

const Container = styled.tr`
  background: #2E2424;
  font-weight: 300;
  vertical-align: baseline;
`

const ActionContainer = styled.td`
  color:${props => props.isPinned ? "#FFD46F" : "inherit"};
`

const PinContainer = styled.td`
  width: 1%;
  text-align: center;
  padding: 6px 13px 6px 15px;
`

const KeysContainer = styled.td`
  width: 1%;
  padding: 0 13px 8px 0;  
`
