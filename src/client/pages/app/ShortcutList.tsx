import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import ShortcutItem from "./ShortcutItem";
import styled from "@emotion/styled";
import { DataContext } from "../../DataContext";

import { upperFirstLetter } from "../../helpers";
import { enterMobileBreakpoint } from "@client/consts";
import { useMediaQuery } from "react-responsive";

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
  const { os } = useContext(DataContext);
  const isMobile = useMediaQuery({ maxWidth: enterMobileBreakpoint });

  return (
    <Container>
      <Title>{upperFirstLetter(title)}</Title>
      <Table isMobile={isMobile}>
        {shortcuts.map((shortcut) => {
          return (
            <ShortcutItem
              key={shortcut._id}
              _id={shortcut._id}
              keys={shortcut[os]}
              action={shortcut.action}
              note={shortcut.note}
              stars={shortcut.stars}
              isHtml={shortcut.isHtml}
              isStarred={!!shortcut.isStarred}
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
  padding: 5px 10px 7px 15px;
  font-size: 14px;
  font-weight: 300;
`;

type TableProps = {
  isMobile: boolean;
};

const Table = styled.div`
  display: grid;
  grid-template-columns: ${({ isMobile }: TableProps) =>
    isMobile ? "45px 2fr 1fr" : "45px auto 2fr 1fr"};
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
  background: #2e2424;
  font-weight: 200;
`;
