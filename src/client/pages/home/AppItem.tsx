import React from "react";
import { observer } from "mobx-react-lite";

import styled from "@emotion/styled";
import { desktopBreakpoint, tabletBreakpoint } from "@client/consts";

export interface AppItemProps {
  name: string;
  icon: string;
  disabled?: boolean;
}

function AppItem({ name, icon, disabled }: AppItemProps) {
  const Container = disabled ? DisabledContainer : EnabledContainer;
  return (
    <Container>
      {disabled && <Soon>Soon</Soon>}
      <Image src={icon} disabled={disabled} />
      <Name disabled={disabled}>{name}</Name>
    </Container>
  );
}

export default observer(AppItem);

const sharedStyles = `
  display: flex;
  border-radius: 7px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: var(--appItemSize);
  padding: 10px;
  border: 1px solid #454040;
  background-color: #403434;
  color: #d1b4b4;
  transition: all 0.5s;

  @media (min-width: ${desktopBreakpoint}px) {
    width: var(--appItemSize);
  }

  @media (max-width: ${tabletBreakpoint}px) {
    font-size:12px;
  }

`;

const DisabledContainer = styled.div`
  ${sharedStyles}
  position: relative;
  overflow: hidden;
`;

const Soon = styled.div`
  background: #d1403d;
  color: #cccad2;
  position: absolute;
  top: 10px;
  left: -20px;
  transform: rotate(-45deg);
  font-size: 13px;
  width: 80px;
  text-align: center;
  z-index: 1;
`;

const EnabledContainer = styled.div`
  ${sharedStyles}
  cursor: pointer;

  :hover {
    color: #e9e5e5;
    background: "#594c4c";
    transform: scale(1.04);
  }
`;

const Name = styled.div`
  text-align: center;
  font-size: 14px;
  opacity: ${[(props: DisablableProps) => (props.disabled ? 0.3 : 1)]};
`;

interface DisablableProps {
  disabled?: boolean;
}

const Image = styled.img`
  width: 60%;
  margin-bottom: 5px;
  opacity: ${[(props: DisablableProps) => (props.disabled ? 0.3 : 1)]};
`;
