import React from "react"

import ShortcutItem from "./ShortcutItem"
import styled from "styled-components"

import { colors } from "../layout"

export default function ShortcutList({ title, shortcuts }) {
  return (
    <div>
      <Title>{title}</Title>
      <Table cellSpacing={0}>
        <TBody>
          {shortcuts.map(shortcut => (
            <ShortcutItem
              key={shortcut.id}
              keys={shortcut.keys.split("+")}
              action={shortcut.action}
              pins={shortcut.pins}
              isPinned={shortcut.isPinned}
            />
          ))}
        </TBody>
      </Table>
    </div>
  )
}

const Title = styled.header`
  display: flex;
  align-items: baseline;
  color: ${colors.softText};
  padding-bottom: 7px;
  text-transform: uppercase;
`

const Table = styled.table`
  width: 100%;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
`

const TBody = styled.tbody`
  & tr:nth-child(odd) {
    background: ${colors.panelZebra};
  }
`
