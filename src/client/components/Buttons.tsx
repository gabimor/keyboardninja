import React, { CSSProperties } from "react";
import styled from "@emotion/styled";

interface Props {
  children: React.ReactNode;
  secondary?: boolean;
  [x: string]: any;
}
export function PrimaryButton({ children, ...props }: Props) {
  return <PrimaryButtonContainer {...props}>{children}</PrimaryButtonContainer>;
}

export function SecondaryButton({ children, ...props }: Props) {
  return (
    <SecondaryButtonContainer {...props}>{children}</SecondaryButtonContainer>
  );
}

const btnStyle = `
  display: block;
  width:100%;
  cursor:pointer;
  color: #E9E5E5;
  padding: 9px 15px;
  border-radius: 4px;
  line-height: 100%;
`;

const PrimaryButtonContainer = styled.button`
  ${btnStyle}

  background-color: #D1403D;
  color: #ffffff;
  border: 1px solid #d1403d;

  &:hover {
    background-color: #e86562;
  }
`;

const SecondaryButtonContainer = styled.button`
  ${btnStyle}
  background:transparent;
  color: #a4a3a6;
  border: 1px solid #a4a3a6;

  &:hover {
    background: #9d8b8b44;
  }
`;
