import React from "react" // eslint-disable-line no-unused-vars
import PropTypes from "prop-types"
import styled from "@emotion/styled"

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

export default function Shortcut({ keys, isHtml }) {
  if (isHtml)
    return (
      <Container dangerouslySetInnerHTML={{ __html: keys }} isHtml={isHtml} />
    )

  let keysArr = split([keys], " or ")

  return keysArr.map((e, index) => (
    <div key={index}>
      <ShortcutOption keys={e} />{" "}
    </div>
  ))
}

function ShortcutOption({ keys }) {
  let keysArr = split([keys], "+")
  keysArr = split(keysArr, "|")
  keysArr = split(keysArr, "..")
  keysArr = split(keysArr, " ")

  return (
    <Container>
      {keysArr.map((key, index) => {
        switch (key) {
          case "+":
          case "..":
            return key
          case " ":
            return "then"
          case "or":
            return (
              <div key={index} className="kbn-or">
                or
              </div>
            )
          case "plus":
            return <kbd key={index}>+</kbd>
          case "|":
            return ""
          case "up":
          case "down":
          case "left":
          case "right":
            return (
              <kbd key={index}>
                <i className={`fas fa-long-arrow-alt-${key}`} />
              </kbd>
            )
          default:
            return <kbd key={index}>{upperFirstLetter(key)}</kbd>
        }
      })}
    </Container>
  )
}

Shortcut.propTypes = {
  keys: PropTypes.string.isRequired,
}

const Container = styled.div`
  display: ${props => (props.isHtml ? "block" : "inline-flex")};
  font-size: 14px;
  color: #e9e5e5;

  kbd {
    font-size: 14px;
  }

  .kbn-or {
    padding: 1px 10px;
  }
`
