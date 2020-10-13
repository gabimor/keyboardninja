import React, { FC } from "react";
import styled from "@emotion/styled";
import { HTMLProps } from "@defs/misc";

type Props = {
  bright?: boolean;
};

const CloseX: FC<Props & HTMLProps> = (props) => (
  <Icon {...props} className="fas fa-times" />
);

export default CloseX;

const Icon = styled("i")<Props>`
  position: absolute;
  cursor: pointer;
  right: 6px;
  top: 6px;
  font-size: 20px;
  color: ${({ bright }) => (bright ? "#555" : "#7a7a7a")};
  padding: 7px;

  :hover {
    color: #666;
  }
`;
