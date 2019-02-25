import React from "react"

import styled from "styled-components"
import { lightenDarkenColor } from "../helpers"

export default function App({ name, icon }) {
  return (
    <Container>
      <Image src={icon} />
      <Name>{name}</Name>
    </Container>
  )
}

const Container = styled.div`
  display: inline-flex;
  padding: 5px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  margin: 10px;
  background-color: #4F4242;
  color: #d1b4b4;
  cursor: pointer;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
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
