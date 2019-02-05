import React from "react"
import { connect } from "react-redux"

import ShortcutItem from "./ShortcutItem"
import ListAddMessage from "./ListAddMessage"
import styled from "styled-components"
import { actionTypes } from "../../store"

import { colors } from "../layout"
const Container = styled.div`
  margin-top: 20px;
`

const Title = styled.header`
  display: flex;
  align-items: baseline;
  color: ${colors.panelZebra};
  padding-bottom: 7px;
`

const Table = styled.table`
  width: 100%;
`

const TBody = styled.tbody`
  & td:first-child {
    padding: 0 10px;
    text-align: center;
    max-width: 20px;
  }

  & tr:nth-child(odd) {
    background: ${colors.panelZebra};
  }
`

function ShortcutList({ title, shortcuts, setOverlay, addShortcut }) {
  return (
    <Container>
      <Title>
        {title}
        <ListAddMessage
          listSize={shortcuts.length}
          onAdd={() => {
            setOverlay(true)
            addShortcut(title)
          }}
        />
      </Title>
      <Table cellSpacing={0}>
        <TBody>
          {shortcuts.map(shortcut => (
            <ShortcutItem
              key={shortcut.id}
              keys={shortcut.win.split("+")}
              action={shortcut.action}
            />
          ))}
        </TBody>
      </Table>
    </Container>
  )
}

const mapDispatchToProps = dispatch => ({
  addShortcut() {
    dispatch({ type: actionTypes.ADD_SHORTCUT })
  },
  setOverlay(value) {
    dispatch({ type: actionTypes.SET_OVERLAY, value })
  },
})

export default connect(
  undefined,
  mapDispatchToProps
)(ShortcutList)
