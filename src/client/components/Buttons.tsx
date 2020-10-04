import React, { CSSProperties } from "react";
import styled from "@emotion/styled";

const baseStyle = `
  display: block;
  width:100%;
  cursor:pointer;
  color: #E9E5E5;
  padding: 10px 15px;
  border-radius: 4px;
  line-height: 100%;
`;

export const PrimaryButton = styled.button`
  ${baseStyle}

  background-color: #D1403D;
  color: #ffffff;
  border: 1px solid #d1403d;

  &:hover {
    background-color: #e86562;
  }
`;

export const SecondaryButton = styled.button`
  ${baseStyle}
  background:transparent;
  color: #a4a3a6;
  border: 1px solid #a4a3a6;

  &:hover {
    background: #9d8b8b44;
  }
`;
