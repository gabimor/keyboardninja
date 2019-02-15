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
  color: ${colors.panelZebra};
  padding-bottom: 7px;
`

const Table = styled.table`
  width: 100%;
`

const TBody = styled.tbody`
  & tr:nth-child(odd) {
    background: ${colors.panelZebra};
  }
`
