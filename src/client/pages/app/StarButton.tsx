import React from "react";
import styled from "@emotion/styled";

interface Props {
  isPinned: boolean;
  onClick: () => void;
}

export default function StarButton({ isPinned, onClick }: Props) {
  const iconName = isPinned ? "star-on" : "star-off";

  return (
    <Container isPinned={isPinned} onClick={onClick}>
      <img src={`/icons/${iconName}.svg`} alt="" />
    </Container>
  );
}

interface PinnableProps {
  isPinned: boolean;
}

const Container = styled.div`
  display: inline-flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background: ${({ isPinned }: PinnableProps) =>
    isPinned ? "#474747" : "#2E2E2E"};
  padding: 5px;
  cursor: pointer;
  user-select: none;

  img {
    height: 26px;
  }

  :hover {
    background: ${({ isPinned }) => (isPinned ? "#525252" : "#393939")};
  }
`;
