import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import { lightenDarkenColor } from "../../helpers";

interface Props {
  pins: number;
  isPinned: boolean;
  onClick: () => void;
}

export default function Shortcut({ pins, isPinned, onClick }: Props) {
  return (
    <Container isPinned={isPinned} onClick={onClick}>
      <IconWrapper>
        {isPinned ? (
          <img src="/icons/pin-on.svg" alt="" />
        ) : (
          <img src="/icons/pin-off.svg" alt="" />
        )}
      </IconWrapper>
      <Count isPinned={isPinned}>{pins}</Count>
    </Container>
  );
}

interface PinnableProps {
  isPinned: boolean;
}

const Container = styled.div`
  display: inline-flex;
  width: 100%;
  align-items: flex-start;
  border: solid 1px
    ${({ isPinned }: PinnableProps) => (isPinned ? "#ffe6ab" : "#9D8B8B")};
  border-radius: 3px;
  padding: 5px 0 3px;
  cursor: pointer;
  vertical-align: middle;
  user-select: none;

  img {
    height: 12px;
  }

  :hover {
    border-color: ${({ isPinned }) =>
      isPinned
        ? lightenDarkenColor("#ffe6ab", 50)
        : lightenDarkenColor("#9D8B8B", 50)};
  }
`;

const IconWrapper = styled.span`
  line-height: 11px;
  margin-left: 7px;
`;

const Count = styled.span`
  font-size: 11px;
  color: ${({ isPinned }: PinnableProps) => (isPinned ? "#ffe6ab" : "#E9E5E5")};
  margin: 0 auto;
  padding: 0 6px;
  line-height: 10px;
`;
