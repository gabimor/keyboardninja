import React from "react";
import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";

interface Props {
  isStarred: boolean;
  onClick: () => void;
}

function StarButton({ isStarred, onClick }: Props) {
  const iconName = isStarred ? "star-on" : "star-off";

  return (
    <Container isStarred={isStarred} onClick={onClick}>
      <img src={`/icons/${iconName}.svg`} alt="" />
    </Container>
  );
}

export default observer(StarButton);
interface StarableProps {
  isStarred: boolean;
}

const Container = styled.div`
  display: inline-flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background: ${({ isStarred }: StarableProps) =>
    isStarred ? "#474747" : "#2E2E2E"};
  padding: 5px;
  cursor: pointer;
  user-select: none;

  img {
    height: 26px;
  }

  :hover {
    background: ${({ isStarred }) => (isStarred ? "#525252" : "#393939")};
  }
`;
