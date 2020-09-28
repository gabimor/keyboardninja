/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

type Props = {
  text: string;
  [x: string]: any;
};

export const FacebookButton = ({ text, ...props }: Props) => (
  <Button css={fbStyle} {...props}>
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
  <Button css={googleStyle} {...props}>
    <img
      src="/icons/google.svg"
      style={{
        background: "white",
        borderRadius: "50%",
        padding: 4,
        width: "calc(1.1em + 9px)",
      }}
    />
    <div> {text}</div>
  </Button>
);

const fbStyle = css`
  background: #3a5696;

  &:hover {
    background: #526aa0;
  }
`;

const googleStyle = css`
  background: #4285f4;

  &:hover {
    background: #669df9;
  }
`;

const Button = styled.button`
  color: white;
  cursor: pointer;
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
