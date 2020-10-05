import React, { useContext, useState } from "react";
import styled from "@emotion/styled";

import { DataContext } from "../../DataContext";
import { pin } from "../../api";
import { upperFirstLetter } from "../../helpers";
import Keys from "./Keys";
import StarButton from "./StarButton";
import StarCount from "./StarCount";
import { enterMobileBreakpoint } from "@client/consts";
import { useMediaQuery } from "react-responsive";

export interface Props {
  _id: string;
  action: string;
  pins: number;
  keys: string;
  isHtml?: boolean;
  isPinned?: boolean;
  note?: string;
}

function ShortcutItem({
  _id,
  action,
  keys,
  pins,
  isPinned,
  isHtml,
  note,
}: Props) {
  const { app, doPin } = useContext(DataContext);
  const [infoVisible, setInfoVisible] = useState(false);
  const [isPinnedState, setIsPinnedState] = useState(isPinned);
  const isMobile = useMediaQuery({ maxWidth: enterMobileBreakpoint });

  async function handlePin() {
    const newPins = isPinnedState ? pins : pins + 1;
    const newIsPinned = !isPinnedState;

    setIsPinnedState(newIsPinned);

    doPin(_id, newPins, newIsPinned);
    await pin(app._id, _id, newIsPinned);
  }

  return (
    <>
      <StarButton isPinned={isPinnedState} onClick={handlePin} />
      {!isMobile && (
        <CellContainer isPinned={isPinnedState} pins={pins}>
          <StarCount pins={pins} />
        </CellContainer>
      )}
      <CellContainer isPinned={isPinnedState}>
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
              <StarCount pins={pins} />
            </StarCountContainer>
          )}
        </div>
      </CellContainer>
      <CellContainer isPinned={isPinnedState}>
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
  isPinned: boolean;
  pins?: number;
}

const CellContainer = styled.div`
  background: ${(props: ActionContainerProps) =>
    props.isPinned ? "#473838" : "inherit"};
  user-select: none;
  border-bottom: solid 1px
    ${({ isPinned }) => (isPinned ? "#604747" : "#453a3a")};
  padding: ${({ pins }) => (pins === 0 ? 0 : "8px 12px")};
  display: flex;
  align-items: center;
`;
