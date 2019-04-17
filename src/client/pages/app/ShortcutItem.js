import React, { Fragment, useContext, useState } from "react" // eslint-disable-line no-unused-vars
import styled from "@emotion/styled"
import PropTypes from "prop-types"

import DataContext from "../../DataContext"
import { pin } from "../../helpers/api"
import { upperFirstLetter } from "../../helpers"
import Shortcut from "./Shortcut"
import Pin from "./Pin"

function ShortcutItem({ id, action, keys, pins, isPinned, isHtml, note }) {
  const { app, doPin } = useContext(DataContext)
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
    <Fragment>
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
    </Fragment>
  )
}

ShortcutItem.propTypes = {
  action: PropTypes.string.isRequired,
  keys: PropTypes.string.isRequired,
}

export default ShortcutItem

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

const ActionContainer = styled.div`
  color: ${props => (props.isPinned ? "#FFD46F" : "inherit")};
  user-select: none;  
  padding-right:20px;
`

const PinContainer = styled.div`
  // width: 1%;
  text-align: center;
  padding: 0 13px 0 15px;
  user-select: none;
`

const KeysContainer = styled.div`
  padding: 0 13px 0 0;
`
