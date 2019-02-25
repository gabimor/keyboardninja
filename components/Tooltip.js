import React from "react"
import styled from "styled-components"

export default function Tooltip({ children, style }) {
  return (
    <Container style={style}>
      <Triangle />
      <Body>{children}</Body>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
`
const Body = styled.div`
  background: #e86562;
  color: #FFFFFF;
  font-size: 14px;
  border-radius: 5px;
  padding: 5px 8px;
`
const Triangle = styled.div`
  position: relative;
  left: 20px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;

  border-bottom: 9px solid #e86562;
`
