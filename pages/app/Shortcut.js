import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { colors } from "../layout"

import ShortcutKey from "../../components/ShortcutKey"
import { upperFirstLetter } from "../../helpers"

function moveKeyFirst(keys, key) {
  if (keys.includes(key)) {
    return [key, ...keys.filter(item => item !== key)]
  } else {
    return keys
  }
}

function addPlus(keys) {
  const result = []
  for (let i = 0; i < keys.length; i++) {
    result.push(keys[i])
    if (keys[i] && keys[i] !== " " && keys[i + 1] && keys[i + 1] !== " ") {
      result.push("+")
    }
  }
  return result
}

export default function Shortcut({ keys }) {
  keys = moveKeyFirst(keys, "shift")
  keys = moveKeyFirst(keys, "alt")
  keys = moveKeyFirst(keys, "ctrl")
  keys = addPlus(keys)
  return (
    <Container>
      {keys.map((key, index) => {
        key = upperFirstLetter(key)
        switch (key) {
          case "+":
            return <Plus key={index}>+</Plus>
          case " ":
            return <Text key={index}>then</Text>
          case "plus":
            return <ShortcutKey key={index}>+</ShortcutKey>
          case "arrowup":
            return (
              <ShortcutKey key={index}>
                <i class="fas fa-long-arrow-alt-up" />
              </ShortcutKey>
            )
          case "arrowdown":
            return (
              <ShortcutKey key={index}>
                <i class="fas fa-long-arrow-alt-down" />
              </ShortcutKey>
            )
          case "arrowleft":
            return (
              <ShortcutKey key={index}>
                <i class="fas fa-long-arrow-alt-left" />
              </ShortcutKey>
            )
          case "arrowright":
            return (
              <ShortcutKey key={index}>
                <i class="fas fa-long-arrow-alt-right" />
              </ShortcutKey>
            )
          case "meta":
            return (
              <ShortcutKey key={index}>
                <i class="fab fa-windows" />
              </ShortcutKey>
            )
          default:
            return <ShortcutKey key={index}>{key}</ShortcutKey>
        }
      })}
    </Container>
  )
}

Shortcut.propTypes = {
  keys: PropTypes.array,
}

const Container = styled.div`
  display: inline-flex;
  font-size: 14px;
  color: ${colors.mainBG};
`

const Plus = styled.span`
  padding: 1px 2px;
`

const Text = styled.span`
  padding: 2px 4px 0;
  font-size: 13px;
`
