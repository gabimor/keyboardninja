import React, { useContext, useState } from "react";
import styled from "@emotion/styled";

import { DataContext } from "../../DataContext";
import { star } from "../../api";
import { upperFirstLetter } from "../../helpers";
import Keys from "./Keys";
import StarButton from "./StarButton";
import StarCount from "./StarCount";
import { enterMobileBreakpoint } from "@client/consts";
import { useMediaQuery } from "react-responsive";

export interface Props {
  _id: string;
  action: string;
  stars: number;
  keys: string;
  isHtml?: boolean;
  isStarred?: boolean;
  note?: string;
}

function ShortcutItem({
  _id,
  action,
  keys,
  stars,
  isStarred,
  isHtml,
  note,
}: Props) {
  const { app, doStar } = useContext(DataContext);
  const [infoVisible, setInfoVisible] = useState(false);
  const [isStarredState, setIsStarredState] = useState(isStarred);
  const isMobile = useMediaQuery({ maxWidth: enterMobileBreakpoint });

  async function handleStar() {
    const newStars = isStarredState ? stars : stars + 1;
    const newIsStarred = !isStarredState;

    setIsStarredState(newIsStarred);

    doStar(_id, newStars, newIsStarred);
    await star(app._id, _id, newIsStarred);
  }

  return (
    <>
      <StarButton isStarred={isStarredState} onClick={handleStar} />
      {!isMobile && (
        <CellContainer isStarred={isStarredState} stars={stars}>
          <StarCount stars={stars} />
        </CellContainer>
      )}
      <CellContainer isStarred={isStarredState}>
        <div>
          {upperFirstLetter(action)}
          {note && (
            <InfoIcon
              className="fas fa-info"
              onClick={() => setInfoVisible(!infoVisible)}
            />
          )}
          {infoVisible && <InfoContainer>{note}</InfoContainer>}
          {isMobile && (
            <StarCountContainer>
              <StarCount stars={stars} />
            </StarCountContainer>
          )}
        </div>
      </CellContainer>
      <CellContainer isStarred={isStarredState}>
        <div>
          <Keys keys={keys} isHtml={isHtml} />
        </div>
      </CellContainer>
    </>
  );
}

export default ShortcutItem;

const StarCountContainer = styled.div`
  margin-top: 5px;
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
  padding: ${({ stars }) => (stars === 0 ? 0 : "8px 12px")};
  display: flex;
  align-items: center;
`;
