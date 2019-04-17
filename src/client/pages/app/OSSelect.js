import React, { useState, useEffect } from "react" // eslint-disable-line no-unused-vars
import styled from "@emotion/styled"

function OSSelect({ oss, os, onSelect }) {
  const [x, setX] = useState(1)

  useEffect(() => setX(9))

  return (
    <Container>
      <button style={{ cursor: "pointer" }} onClick={() => setX(x + 1)}>
        {x}
      </button>
      <OSButton
        buttonOS="win"
        selectedOS={os}
        supportedOSS={oss}
        onClick={onSelect}
      />
      <OSButton
        buttonOS="mac"
        selectedOS={os}
        supportedOSS={oss}
        onClick={onSelect}
      />
    </Container>
  )
}

const OSButton = ({ buttonOS, selectedOS, supportedOSS, onClick }) => {
  const SELECTED_COLOR = "#E9E5E5"
  const UNSELECTED_COLOR = "#5A5A5A"
  const iconName = buttonOS === "mac" ? "apple" : "windows"

  return (
    supportedOSS.includes(buttonOS) && (
      <i
        className={"fab fa-" + iconName}
        style={{
          color: selectedOS === buttonOS ? SELECTED_COLOR : UNSELECTED_COLOR,
          cursor: selectedOS === buttonOS ? "default" : "pointer",
        }}
        onClick={() =>
          selectedOS === buttonOS ? undefined : onClick(buttonOS)
        }
      />
    )
  )
}
export default OSSelect

const Container = styled.span`
  font-size: 30px;
  i + i {
    margin-left: 20px;
  }
`
