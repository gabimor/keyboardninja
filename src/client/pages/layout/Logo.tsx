import React from "react";

import styled from "@emotion/styled";
import { tabletBreakpoint } from "@client/consts";

export default function Logo() {
  return (
    <H1>
      keyboard
      <span style={{ fontWeight: 700 }}>
        ninja<Dot>.</Dot>
        me
      </span>
    </H1>
  );
}

const H1 = styled.h1`
  color: #ffffff;
  font-size: 30px;
  display: inline-block;
  cursor: pointer;
  font-weight: 300;
  position: relative;

  @media (max-width: ${tabletBreakpoint}px) {
    font-size: 25px;
  }
`;

const Dot = styled.span`
  color: #e86562;
  font-size: 1.35em;
`;
