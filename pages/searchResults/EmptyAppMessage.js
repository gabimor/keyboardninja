import React from "react"

import styled from "styled-components"
import { colors } from "./../layout"
import Button from "../../components/Button"


export default function EmptyAppMessage({ onClick }) {
  return (
    <Container>
      <H2>
        <b> Woohoo</b> it's a fresh one!
      </H2>
      <H3>There are no shortcuts here yet...</H3>
      <Button onClick={onClick}>Add Some?</Button>
    </Container>
  )
}

const Container = styled.div`
  background: ${colors.panelGray};
  color: ${colors.mainBG};
  text-align: center;
  padding: 60px 0;
`

const H2 = styled.h2`
  margin-bottom: 7px;
`

const H3 = styled.h3`
  margin-bottom: 13px;
  font-weight: 300;
`
