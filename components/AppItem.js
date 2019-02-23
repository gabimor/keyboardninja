import React from "react"

import styled from "styled-components"
import { colors } from "../pages/layout"
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
  padding:5px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  margin: 10px;
  background-color: ${colors.appPanel};
  color: ${colors.textRed};
  cursor: pointer;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
  transition: all 0.3s;

  :hover {
    color: ${colors.softText};
    background: ${lightenDarkenColor(colors.appPanel, 10)};
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
