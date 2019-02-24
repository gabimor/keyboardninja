import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { colors } from "../layout"

import ShortcutKey from "./ShortcutKey"
import { upperFirstLetter } from "../../helpers"

function split(keysArr, seperator) {
  const newArr = []
  for (const item1 of keysArr) {
    const item1Split = item1.split(seperator)
    for (let i = 0; i < item1Split.length; i++) {
      newArr.push(item1Split[i].trim())
      // dont add seperator after last element
      if (i !== item1Split.length - 1) {
        newArr.push(seperator)
      }
    }
  }

  return newArr
}

export default function Shortcut({ keys }) {
  let keysArr = split([keys], " or ")
  keysArr = split(keysArr, "+")
  keysArr = split(keysArr, " ")
  return (
    <Container>
      {keysArr.map((key, index) => {
        if (key === "+") return <Plus key={index}>+</Plus>
        else if (key === " ") return <Text key={index}>then</Text>
        else if (key === "or") return <Or key={index}>or</Or>
        else if (key === "plus") return <ShortcutKey key={index}>+</ShortcutKey>
        else if (
          key === "up" ||
          key === "down" ||
          key === "left" ||
          key === "right"
        ) {
          return (
            <ShortcutKey key={index}>
              <i className="fas fa-long-arrow-alt-${key}" />
            </ShortcutKey>
          )
        } else
          return <ShortcutKey key={index}>{upperFirstLetter(key)}</ShortcutKey>
      })}
    </Container>
  )
}

Shortcut.propTypes = {
  keys: PropTypes.string.isRequired,
}

const Container = styled.div`
  font-size: 14px;
  color: ${colors.mainBG};
`

const Plus = styled.span`
  padding: 1px 0px;
`

const Or = styled.div`
  padding: 1px 10px;
`

const Text = styled.span`
  padding: 2px 4px 0;
  font-size: 13px;
  color: ${colors.white};
`
