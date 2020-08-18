import React from "react";

import styled from "@emotion/styled";
import { lightenDarkenColor } from "../helpers";

const ButtonLink = styled.a`
  color: #e86562;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: ${lightenDarkenColor("#e86562", 10)};
  }
`;

export default ButtonLink;
