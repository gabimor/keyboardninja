import React, { useContext } from "react" // eslint-disable-line no-unused-vars
import styled from "@emotion/styled"
import PropTypes from "prop-types"

import DataContext from "../../DataContext"
import { pin } from "../../helpers/api"
import { upperFirstLetter } from "../../helpers"
import Shortcut from "./Shortcut"
import Pin from "./Pin"

function ShortcutItem({ id, action, keys, pins, isPinned }) {
  const { app, user } = useContext(DataContext)

  async function handlePin() {
    if (user) {
      await pin(app.id, id, !isPinned)
    } else {
      alert("not logged in")
    }
  }

  // return "test"
  return (
    <Container>
      <PinContainer>
        <Pin isPinned={isPinned} count={pins} onClick={handlePin} />
      </PinContainer>
      <ActionContainer isPinned={isPinned}>
        {upperFirstLetter(action)}
      </ActionContainer>
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
  background: #2e2424;
  font-weight: 300;
  vertical-align: baseline;
`

const ActionContainer = styled.td`
  color: ${props => (props.isPinned ? "#FFD46F" : "inherit")};
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
