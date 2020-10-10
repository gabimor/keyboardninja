import React, { useState } from "react";
import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";

import { upperFirstLetter } from "../../helpers";
import Keys from "./Keys";
import StarButton from "./StarButton";
import StarCount from "./StarCount";
import { enterMobileBreakpoint } from "@client/consts";

export interface Props {
  _id: string;
  action: string;
  stars: number;
  keys: string;
  isHtml?: boolean;
  isStarred?: boolean;
  note?: string;
  onStar: (shortcutId: string) => void;
}

function ShortcutItem({
  _id,
  action,
  keys,
  stars,
  isStarred,
  isHtml,
  note,
  onStar,
}: Props) {
  const [infoVisible, setInfoVisible] = useState(false);

  return (
    <>
      <StarButton isStarred={isStarred} onClick={() => onStar(_id)} />
      <CellContainer isStarred={isStarred} stars={stars}>
        <ColumnStarCount stars={stars} />
      </CellContainer>
      <CellContainer isStarred={isStarred}>
        <div style={{ padding: "8px 12px" }}>
          {upperFirstLetter(action)}
          {note && (
            <InfoIcon
              className="fas fa-info"
              onClick={() => setInfoVisible(!infoVisible)}
            />
          )}
          {infoVisible && <InfoContainer>{note}</InfoContainer>}
          <TextStarCount stars={stars} />
        </div>
      </CellContainer>
      <CellContainer isStarred={isStarred}>
        <div style={{ padding: "8px 12px" }}>
          <Keys keys={keys} isHtml={isHtml} />
        </div>
      </CellContainer>
    </>
  );
}

export default observer(ShortcutItem);

const ColumnStarCount = styled(StarCount)`
  padding: 8px 12px 8px 24px;
  @media (max-width: ${enterMobileBreakpoint}px) {
    display: none;
  }
`;

const TextStarCount = styled(StarCount)`
  margin-top: 5px;
  @media (min-width: ${enterMobileBreakpoint}px) {
    display: none;
  }
`;

const InfoIcon = styled.i`
  font-size: 13px;
  color: #a4a3a6;
  margin-left: 10px;
  cursor: pointer;
`;

const InfoContainer = styled.div`
  font-size: 13px;
  color: #a4a3a6;
  margin-top: 3px;
`;

interface ActionContainerProps {
  isStarred: boolean;
  stars?: number;
}

const CellContainer = styled.div`
  background: ${(props: ActionContainerProps) =>
    props.isStarred ? "#473838" : "inherit"};
  user-select: none;
  border-bottom: solid 1px
    ${({ isStarred }) => (isStarred ? "#604747" : "#453a3a")};
  display: flex;
  align-items: center;
  transition: background 0.1s ease-in-out;
`;
