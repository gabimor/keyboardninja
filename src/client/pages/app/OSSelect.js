import React, { useState, useEffect } from "react"
import styled from "@emotion/styled"

import { loadOS, saveOS } from "../../helpers/localStorage"
import { getClientOS } from "../../helpers"

function OSSelect({ onSelect }) {
  const [os, setOS] = useState({})

  useEffect(() => {
    let detectedOS = loadOS()
    if (!detectedOS) {
      detectedOS = getClientOS()
      saveOS(detectedOS)
    }
    setOS(detectedOS)
  }, [])

  function handleSelect(selectedOS) {
    setOS(selectedOS)
    saveOS(selectedOS)
    onSelect(selectedOS)
  }

  const getColor = chosenOS => (os && chosenOS === os ? "#E9E5E5" : "#5A5A5A")

  return (
    <Container>
      <i
        className="fab fa-windows"
        style={{ color: getColor("win") }}
        onClick={() => handleSelect("win")}
      />
      <i
        className="fab fa-apple"
        style={{ color: getColor("osx"), paddingLeft: 20 }}
        onClick={() => handleSelect("osx")}
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
