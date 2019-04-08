import React, { useContext, useState } from "react" // eslint-disable-line no-unused-vars
import styled from "@emotion/styled"
import PropTypes from "prop-types"

import DataContext from "../../DataContext"
import { pin } from "../../helpers/api"
import { upperFirstLetter } from "../../helpers"
import Shortcut from "./Shortcut"
import Pin from "./Pin"

function ShortcutItem({
  id,
  action,
  keys,
  pins: _pins,
  isPinned: _isPinned,
  isHtml,
  note,
}) {
  const { app, user, doPin } = useContext(DataContext)
  const [pins, setPins] = useState(_pins)
  const [infoVisible, setInfoVisible] = useState(false)
  const [isPinned, setIsPins] = useState(_isPinned)

  async function handlePin() {
    if (user) {
      const newPins = isPinned ? pins - 1 : pins + 1
      const newIsPinned = !isPinned

      setPins(newPins)
      setIsPins(newIsPinned)
      await pin(app._id, id, newIsPinned)
      doPin(id, newPins, newIsPinned)
    } else {
      alert("not logged in")
    }
  }

  return (
    <Container>
      <PinContainer>
        <Pin isPinned={isPinned} count={pins} onClick={handlePin} />
      </PinContainer>
      <ActionContainer isPinned={isPinned}>
        {upperFirstLetter(action)}
        {note && (
          <InfoIcon
            className="fas fa-info"
            onClick={() => setInfoVisible(true)}
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
`

const PinContainer = styled.td`
  width: 1%;
  text-align: center;
  padding: 6px 13px 6px 15px;
`

const KeysContainer = styled.td`
  padding: 0 13px 8px 0;
`
