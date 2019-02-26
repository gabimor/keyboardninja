import React from "react"

import ShortcutItem from "./ShortcutItem"
import styled from "styled-components"

import { upperFirstLetter } from "../../helpers"

export default function ShortcutList({ title, shortcuts }) {
  return (
    <Container>
      <Title>{upperFirstLetter(title)}</Title>
      <Table cellSpacing={0}>
        <TBody>
          {shortcuts.map(shortcut => (
            <ShortcutItem
              key={shortcut.id}
              keys={shortcut.keys}
              action={shortcut.action}
              pins={shortcut.pins}
              isPinned={shortcut.isPinned}
            />
          ))}
        </TBody>
      </Table>
    </Container>
  )
}

const Container = styled.div`
  display: inline-block;
  margin-bottom: 40px;
  font-size: 14px;
  border-radius: 5px;
  overflow: hidden;
`

const Title = styled.header`
  color: #e9e5e5;
  background: #a12d2a;
  padding: 5px 10px 7px 15px;
`

const Table = styled.table`
  width: 100%;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
`

const TBody = styled.tbody`
  & td {
    border-bottom: solid 1px #453a3a;
  }
`
