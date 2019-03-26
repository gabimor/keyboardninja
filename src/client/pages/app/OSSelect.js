import React, { useState, useEffect } from "react" // eslint-disable-line no-unused-vars
import styled from "@emotion/styled"

import { osTypes } from "../../helpers/osSelect"

function OSSelect({ os, onSelect }) {
  const SELECTED_COLOR = "#E9E5E5"
  const UNSELECTED_COLOR = "#5A5A5A"

  return (
    <Container>
      <i
        className="fab fa-windows"
        style={{ color: os === osTypes.WIN ? SELECTED_COLOR : UNSELECTED_COLOR }}
        onClick={() => onSelect(osTypes.WIN)}
      />
      <i
        className="fab fa-apple"
        style={{
          color: os === osTypes.MAC ? SELECTED_COLOR : UNSELECTED_COLOR,
          paddingLeft: 20,
        }}
        onClick={() => onSelect(osTypes.MAC)}
      />
    </Container>
  )
}

export default OSSelect

const Container = styled.span`
  font-size: 30px;
  cursor: pointer;
  border-left: solid 1px #5a5a5a;
  padding-left: 20px;
`
