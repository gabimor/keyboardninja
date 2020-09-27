import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

type Props = {
  text: string;
};

export const FacebookButton = ({ text, ...props }: Props) => (
  <Button style={{ background: "#3a5696" }} {...props}>
    <img
      src="/icons/facebook.svg"
      style={{
        width: "calc(1.1em + 9px)",
      }}
    />
    <div> {text}</div>
  </Button>
);

export const GoogleButton = ({ text, ...props }: Props) => (
  <Button style={{ background: "#4285f4" }} {...props}>
    <img
      src="/icons/google.svg"
      style={{
        background: "white",
        borderRadius: "50%",
        padding: 4,
        width: "1.1em",
      }}
    />
    <div> {text}</div>
  </Button>
);

const Button = styled.button`
  color: white;
  display: flex;
  align-items: center;
  border-radius: 5px;
  width: 100%;
  padding: 6px;
  div {
    text-align: middle;
    flex-grow: 1;
  }

  img {
    margin-right: 10px;
  }
`;
