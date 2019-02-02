import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { colors } from "../layout"

import ShortcutKey from "../../components/ShortcutKey"
import { upperFirstLetter } from "../../helpers"

const Container = styled.div`
  display: inline-flex;
  font-size: 14px;
  padding: 2px;
  color: ${colors.mainBG};
`

const Plus = styled.span`
  padding: 2px;
`

const Text = styled.span`
  padding: 2px 4px 0;
  font-size: 13px;
`

function getKeyName(key) {
  const keyNames = {
    Control: "Ctrl",
    " ": "Space",
    Escape: "Esc",
  }

  return keyNames[key] || key
}

function moveKeyFirst(keys, key) {
  if (keys.includes(key)) {
    return [key, ...keys.filter(item => item !== key)]
  } else {
    return keys
  }
}

export default function Shortcut({ keys }) {
  keys = moveKeyFirst(keys, "Shift")
  keys = moveKeyFirst(keys, "Alt")
  keys = moveKeyFirst(keys, "Control")

  return (
    <Container>
      {keys.map(key => {
        key = getKeyName(key)
        key = upperFirstLetter(key)
        switch (key) {
          case "+":
            return <Plus>+</Plus>
          case " ":
            return <Text>then</Text>
          default:
            return <ShortcutKey key={key}>{key}</ShortcutKey>
        }
      })}
    </Container>
  )
}

// function getKeysArr(keys) {
//   const spaceSplit = keys.split(" ")

//   const arr = []

//   for (const spaceItem of spaceSplit) {
//     const plusSplit = spaceItem.split("+")

//     for (const plusItem of plusSplit) {
//       arr.push(plusItem)
//       arr.push("+")
//     }
//     arr.pop()
//     arr.push(" ")
//   }

//   arr.pop()
//   return arr
// }

Shortcut.propTypes = {
  keys: PropTypes.array,
}
