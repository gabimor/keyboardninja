import React from "react";
import styled from "@emotion/styled";
import { tabletBreakpoint } from "@client/consts";

interface Props {
  onDismiss: () => void;
}

const FirstTimeMessage = ({ onDismiss }: Props) => (
  <Container>
    <b>Welcome!</b> Here's a few things to try: <br />
    <TextWrapper>
      <ul>
        <li>
          1. Press the <Highlight>Pin</Highlight> button to select your favorite
          shortcuts
        </li>
        <li>
          2. Press <Highlight>Get Link</Highlight> to get a link with your saved
          selection
        </li>
      </ul>
    </TextWrapper>
    <Dismiss onClick={onDismiss}>&times;</Dismiss>
  </Container>
);

export default FirstTimeMessage;

const Container = styled.div`
  background: #742f2d;
  padding: 20px;
  font-size: 16px;
  line-height: 1.5em;
  border-radius: 5px;
  margin-bottom: 20px;
  position: relative;
  font-weight: 300;

  @media (min-width: ${tabletBreakpoint}px) {
    font-size: 20px;
    margin-top: -20px;
  }
`;
const TextWrapper = styled.div`
  margin: 0.5em 0;
`;

const Dismiss = styled.span`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 9px;
  font-size: 28px;
  font-weight: 200;
  color: #e9e5e5;
`;

const Highlight = styled.span`
  color: #ffe6ab;
`;
