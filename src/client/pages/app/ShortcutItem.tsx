import React, { useContext, useState } from "react";
import styled from "@emotion/styled";

import { DataContext } from "../../DataContext";
import { pin } from "../../api";
import { upperFirstLetter } from "../../helpers";
import Shortcut from "./Shortcut";
import Pin from "./Pin";

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
  const [pinsState, setPinsState] = useState(pins);
  const [infoVisible, setInfoVisible] = useState(false);
  const [isPinnedState, setIsPinnedState] = useState(isPinned);

  async function handlePin() {
    const newPins = isPinnedState ? pins : pins + 1;
    const newIsPinned = !isPinnedState;
    setPinsState(newPins);
    setIsPinnedState(newIsPinned);

    doPin(_id, newPins, newIsPinned);
    await pin(app._id, _id, newIsPinned);
  }

  return (
    <>
      <PinContainer>
        <Pin isPinned={isPinnedState} pins={pinsState} onClick={handlePin} />
      </PinContainer>
      <ActionContainer isPinned={isPinnedState}>
        {upperFirstLetter(action)}
        {note && (
          <InfoIcon
            className="fas fa-info"
            onClick={() => setInfoVisible(!infoVisible)}
          />
        )}
        {infoVisible && <InfoContainer>{note}</InfoContainer>}
      </ActionContainer>
      <KeysContainer>
        <Shortcut keys={keys} isHtml={isHtml} />
      </KeysContainer>
    </>
  );
}

export default ShortcutItem;

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
}

const ActionContainer = styled.div`
  color: ${(props: ActionContainerProps) =>
    props.isPinned ? "#ffe6ab" : "inherit"};
  user-select: none;
  padding-right: 20px;
`;

const PinContainer = styled.div`
  text-align: center;
  padding: 0 13px 0 15px;
  user-select: none;
`;

const KeysContainer = styled.div`
  padding: 0 13px 0 0;
`;
