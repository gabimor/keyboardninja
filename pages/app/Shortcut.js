import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { colors } from "../layout"

import ShortcutKey from "../../components/ShortcutKey"
import { upperFirstLetter } from "../../helpers"

export default function Shortcut({ keys }) {  
  return (
    <Container>
      {keys.split("+").map((key, index) => {
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
  keys: PropTypes.string.isRequired,
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
