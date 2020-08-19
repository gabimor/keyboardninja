import React, { useContext } from "react";

import ShortcutItem from "./ShortcutItem";
import styled from "@emotion/styled";
import { DataContext } from "../../DataContext";

import { upperFirstLetter } from "../../helpers";

interface Shortcut {
  _id: string;
  action: string;
  win?: string;
  mac?: string;
  pins: number;
  isPinned?: boolean;
  isHtml?: boolean;
  note?: string;
}

interface Props {
  title: string;
  shortcuts: Shortcut[];
}

export default function ShortcutList({ title, shortcuts }: Props) {
  const { os } = useContext(DataContext);

  return (
    <Container>
      <Title>{upperFirstLetter(title)}</Title>
      <Table>
        {shortcuts.map((shortcut) => {
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
          );
        })}
      </Table>
    </Container>
  );
}

const Container = styled.div`
  display: inline-block;
  margin-bottom: 40px;
  font-size: 14px;
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
`;

const Title = styled.header`
  color: #e9e5e5;
  background: #a12d2a;
  padding: 5px 10px 7px 15px;
  font-size: 16px;
`;

const Table = styled.div`
  display: grid;
  grid-gap: 8px 0;
  grid-template-columns: 80px 1fr 1fr;
  padding: 8px 0;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
  background: #2e2424;
  font-weight: 300;

  > div {
    border-bottom: solid 1px #453a3a;
    padding-bottom: 8px;
  }
`;
