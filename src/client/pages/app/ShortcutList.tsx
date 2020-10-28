import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import ShortcutItem from "./ShortcutItem";
import styled from "@emotion/styled";
import { DataContext } from "../../DataContext";

import { upperFirstLetter } from "../../helpers";

interface Shortcut {
  _id: string;
  action: string;
  win?: string;
  mac?: string;
  stars: number;
  isStarred?: boolean;
  isHtml?: boolean;
  note?: string;
}

interface Props {
  title: string;
  shortcuts: Shortcut[];
}

function ShortcutList({ title, shortcuts }: Props) {
  const store = useContext(DataContext);

  const onStar = (shortcutId: string) => {
    if (store.user) {
      store.toggleStar(shortcutId);
    } else {
      store.setLoginModalVisible(true);
    }
  };

  return (
    <Container>
      <Title>{upperFirstLetter(title)}</Title>
      <Table>
        {shortcuts.map((shortcut) => {
          return (
            <ShortcutItem
              key={shortcut._id}
              _id={shortcut._id}
              keys={shortcut[store.os]}
              action={shortcut.action}
              note={shortcut.note}
              stars={shortcut.stars}
              isHtml={shortcut.isHtml}
              isStarred={!!shortcut.isStarred}
              onStar={onStar}
            />
          );
        })}
      </Table>
    </Container>
  );
}

export default observer(ShortcutList);

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
  padding: 5px 10px 7px 10px;
  font-size: 14px;
  font-weight: 300;
`;

const Table = styled.div`
  display: grid;
  grid-template-columns: 45px auto 2fr 1fr;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
  background: #2e2424;
  font-weight: 200;
`;
