import React, { useContext, useState } from "react" // eslint-disable-line no-unused-vars
import styled from "@emotion/styled"
import PropTypes from "prop-types"

import DataContext from "../../DataContext"
import { pin } from "../../helpers/api"
import { upperFirstLetter } from "../../helpers"
import Shortcut from "./Shortcut"
import Pin from "./Pin"

function ShortcutItem({ id, action, keys, pins, isPinned, isHtml, note }) {
  const { app, user, doPin } = useContext(DataContext)
  const [pinsState, setPinsState] = useState(pins)
  const [infoVisible, setInfoVisible] = useState(false)
  const [isPinnedState, setIsPinnedState] = useState(isPinned)

  async function handlePin() {
    const newPins = isPinnedState ? pins : pins + 1
    const newIsPinned = !isPinnedState
    setPinsState(newPins)
    setIsPinnedState(newIsPinned)

    doPin(id, newPins, newIsPinned)
    await pin(app._id, id, newIsPinned)

    // if (user) {
    // } else {
    // }
  }

  return (
    <Container>
      <PinContainer>
        <Pin isPinned={isPinnedState} pins={pinsState} onClick={handlePin} />
      </PinContainer>
      <ActionContainer isPinned={isPinnedState}>
        {upperFirstLetter(action)}
        {note && (
          <InfoIcon
            className="fas fa-info"
            onClick={() => setInfoVisible(!infoVisible)}
          />
        )}
        {infoVisible && <InfoContainer>{note}</InfoContainer>}
      </ActionContainer>
      <KeysContainer>
        <Shortcut keys={keys} isHtml={isHtml} />
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

const InfoIcon = styled.i`
  font-size: 13px;
  color: #a4a3a6;
  margin-left: 10px;
  cursor: pointer;
`

const InfoContainer = styled.div`
  font-size: 13px;
  color: #a4a3a6;
  margin-top: 3px;
`

const ActionContainer = styled.td`
  color: ${props => (props.isPinned ? "#FFD46F" : "inherit")};
  width: 50%;
  padding-right: 30px;
  user-select: none;
`

const PinContainer = styled.td`
  width: 1%;
  text-align: center;
  padding: 6px 13px 6px 15px;
  user-select: none;
`

const KeysContainer = styled.td`
  padding: 0 13px 0 0;
`
