import React, { CSSProperties } from "react";
import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";

interface Props {
  children: React.ReactNode;
  secondary?: boolean;
  style?: CSSProperties;
  onClick?: () => void;
  to?: string;
}
export default function Button({
  children,
  secondary,
  style,
  onClick,
  to,
}: Props) {
  const history = useHistory();

  const handleClick = () => {
    if (to) {
      history.push(to);
    } else if (onClick) {
      onClick();
    }
  };

  return secondary ? (
    <SecondaryButton style={style} onClick={handleClick}>
      {children}
    </SecondaryButton>
  ) : (
    <PrimaryButton style={style} onClick={handleClick}>
      {children}
    </PrimaryButton>
  );
}

const btnStyle = `
  display: inline-block;
  cursor:pointer;
  color: #E9E5E5;
  padding: 8px 15px;
  border-radius: 4px;
  line-height: 100%;
`;

const PrimaryButton = styled.button`
  ${btnStyle}

  background-color: #D1403D;
  color: #ffffff;
  border: 1px solid #d1403d;

  &:hover {
    background-color: #e86562;
  }
`;

const SecondaryButton = styled.button`
  ${btnStyle}
  background:transparent;
  color: #a4a3a6;
  border: 1px solid #a4a3a6;

  &:hover {
    background: #9d8b8b;
  }
`;
