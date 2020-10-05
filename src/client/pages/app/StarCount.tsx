import React from "react";
import styled from "@emotion/styled";

interface Props {
  stars: number;
}

export default function StarCount({ stars }: Props) {
  if (stars === 0) return null;

  return (
    <Container>
      <img src="/icons/star-on.svg" alt="" />
      <Count>{stars}</Count>{" "}
    </Container>
  );
}

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
