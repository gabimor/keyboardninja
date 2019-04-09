import React from "react" // eslint-disable-line no-unused-vars

import styled from "@emotion/styled"
import { lightenDarkenColor } from "../helpers"

export default function App({ name, icon, disabled }) {  
  const Container = disabled ? DisabledContainer : EnabledContainer
  return (
    <Container>
      <Image src={icon} />
      <Name>{name}</Name>
    </Container>
  )
}

const sharedStyles = `
display: inline-flex;
padding: 5px;
flex-direction: column;
align-items: center;
justify-content: center;
width: 120px;
height: 120px;
margin: 10px;
background-color: #4f4242;
color: #d1b4b4;
box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
`

const DisabledContainer = styled.div`
  ${sharedStyles}
  opacity: 0.4;
`

const EnabledContainer = styled.div`
  ${sharedStyles}
  cursor: pointer;
  transition: all 0.3s;

  :hover {
    color: #e9e5e5;
    background: ${lightenDarkenColor("#4F4242", 10)};
    box-shadow: 0 12px 17px rgba(0, 0, 0, 0.4);
    transform: scale(1.04);
  }
`

const Name = styled.div`
  text-align: center;
  font-size: 14px;
`
const Image = styled.img`
  width: 60%;
  margin-bottom: 5px;
`
