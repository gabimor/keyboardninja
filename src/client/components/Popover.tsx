import React from "react";
import styled from "@emotion/styled";

interface Props {
  onClose: () => void;
  children: string;
}

const VotePopover = ({ onClose, children }: Props) => (
  <Container>
    <Text>{children}</Text>
    <Dismiss onClick={onClose}>Dismiss</Dismiss>
    <Tip />
  </Container>
);

export default VotePopover;

const Container = styled.div`
  --bg: #982a29;
  display: inline-block;
  background: var(--bg);
  border-radius: 12px;
  padding: 15px 20px;
  font-weight: 300;
  position: relative;
  position: absolute;
  top: 110px;
  left: 60px;

  box-shadow: 9px 6px 22px 6px rgba(30, 30, 30, 0.7);
`;

const Text = styled.div`
  margin-bottom: 10px;
`;

const Tip = styled.div`
  position: absolute;
  left: -13px;
  top: 45%;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 7px 13px 7px 0;
  border-color: transparent var(--bg) transparent transparent;
`;

const Dismiss = styled.div`
  text-align: right;
  color: #d1b4b4;
  cursor: pointer;
`;
