import React from "react";
import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";

interface Props {
  stars: number;
}

function StarCount({ stars }: Props) {
  if (stars === 0) return null;

  return (
    <Container>
      <img src="/icons/star-on.svg" alt="" />
      <Count>{stars}</Count>{" "}
    </Container>
  );
}

export default observer(StarCount)

const Container = styled.div`
  display: inline-flex;
  width: 100%;
  align-items: flex-start;
  user-select: none;

  img {
    height: 16px;
  }
`;

const Count = styled.span`
  font-size: 12px;
  padding: 0 6px;
`;
