import React from "react" // eslint-disable-line no-unused-vars

import styled from "@emotion/styled"
import { lightenDarkenColor } from "../helpers"

export default function App({ name, icon, disabled }) {
  const Container = disabled ? DisabledContainer : EnabledContainer
  return (
    <Container>
      {disabled && <Soon>Soon</Soon>}
      <Image src={icon} disabled={disabled} />
      <Name disabled={disabled}>{name}</Name>
    </Container>
  )
}

const sharedStyles = `
  display: inline-flex;
  padding: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #403434;
  color: #d1b4b4;
  height: var(--appItemSize);  

  @media (min-width: 992px) {
    width: var(--appItemSize);
  }

  @media (max-width: 768px) {
      font-size:12px;        
  }

`

const DisabledContainer = styled.div`
  ${sharedStyles}
  position: relative;
  overflow: hidden;
`

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
`

const EnabledContainer = styled.div`
  ${sharedStyles}
  cursor: pointer;

  :hover {
    color: #e9e5e5;
    background: ${lightenDarkenColor("#4F4242", 10)};
    transform: scale(1.04);
  }
`

const Name = styled.div`
  text-align: center;
  font-size: 14px;
  opacity: ${[props => (props.disabled ? 0.3 : 1)]};
`
const Image = styled.img`
  width: 60%;
  margin-bottom: 5px;
  opacity: ${[props => (props.disabled ? 0.3 : 1)]};
`
