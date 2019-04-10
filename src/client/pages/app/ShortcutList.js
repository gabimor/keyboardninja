import React, { useContext } from "react" // eslint-disable-line no-unused-vars

import ShortcutItem from "./ShortcutItem"
import styled from "@emotion/styled"
import DataContext from "../../DataContext"

import { upperFirstLetter } from "../../helpers"

export default function ShortcutList({ title, shortcuts }) {
  const { os } = useContext(DataContext)

  return (
    <Container>
      <Title>{upperFirstLetter(title)}</Title>
      <Table cellSpacing={0}>
        <TBody>
          {shortcuts.map(shortcut => {
            return (
              <ShortcutItem
                key={shortcut._id}
                id={shortcut._id}
                keys={shortcut[os]}
                action={shortcut.action}
                note={shortcut.note}
                pins={shortcut.pins}
                isHtml={shortcut.isHtml}
                isPinned={!!shortcut.isPinned}
              />
            )
          })}
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
    line-height: 1.5;
  }
`
