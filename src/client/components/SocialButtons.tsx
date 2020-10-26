/** @jsx jsx */
import React, { useState } from "react";
import { InterpolationWithTheme, jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import ClipLoader from "react-spinners/ClipLoader";

type SocialButton = {
  text: string;
  icon: string;
  css: InterpolationWithTheme<any>;
};

const SocialButton: React.FC<SocialButton> = ({ text, icon, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button onClick={() => setIsLoading(true)} type="button" {...props}>
      <img src={icon} />
      <div>
        {text} <ClipLoader size={10} color={"#fff"} loading={isLoading} />
      </div>
    </Button>
  );
};

export const FacebookButton = () => (
  <SocialButton
    text={"Continue with Facebook"}
    icon={"icons/facebook.svg"}
    css={fbStyle}
  />
);

export const GoogleButton = () => (
  <SocialButton
    text={"Continue with Google"}
    icon={"icons/google.svg"}
    css={googleStyle}
  />
);

const fbStyle = css`
  background: #3a5696;

  img {
    width: calc(1.1em + 9px);
  }

  &:hover {
    background: #526aa0;
  }
`;

const googleStyle = css`
  background: #4285f4;

  img {
    background: white;
    border-radius: 50%;
    padding: 4px;
    width: calc(1.1em + 9px);
  }

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
  height: 36px;
  padding: 6px;
  div {
    text-align: middle;
    flex-grow: 1;
  }

  img {
    margin-right: 10px;
  }
`;
