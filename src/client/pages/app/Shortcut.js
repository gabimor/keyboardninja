import React, { Fragment } from "react" // eslint-disable-line no-unused-vars
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
      <Container
        dangerouslySetInnerHTML={{ __html: prepareHtml(keys) }}
        isHtml={isHtml}
      />
    )

  let keysArr = split([keys], " or ")

  return keysArr.map((e, index) => (
    <div key={index}>
      <ShortcutOption keys={e} />{" "}
    </div>
  ))
}

function prepareHtml(html) {
  let isEnding = false

  while (html.includes("**")) {
    html = html.replace("**", isEnding ? "</kbd>" : "<kbd>")
    isEnding = !isEnding
  }

  return upperFirstLetter(html)
}

function ShortcutOption({ keys }) {
  let keysArr = split([keys], "+")
  keysArr = split(keysArr, "|")
  keysArr = split(keysArr, "..")
  keysArr = split(keysArr, " ")

  return (
    <Container>
      {keysArr.map((key, index) => {
        let numpad
        if (key.includes("numpad")) {
          key = key.replace("numpad", "")
          numpad = " Numpad "
        }
        let toRender

        key = key.toLowerCase()

        switch (key) {
          case "arrows":
          case "+":
          case "..":
            return <Spacer key={index}>{key}</Spacer>
          case " ":
            return <Then key={index}>then</Then>
          case "or":
            return (
              <div key={index} className="kbn-or">
                or
              </div>
            )
          case "plus":
            toRender = <kbd key={index}>+</kbd>
            break
          case "|":
            return <Spacer key={index}>/</Spacer>
          case "up":
          case "down":
          case "left":
          case "right":
            toRender = (
              <kbd key={index}>
                <i className={`fas fa-long-arrow-alt-${key}`} />
              </kbd>
            )
            break
          default:
            toRender = <kbd key={index}>{upperFirstLetter(key)}</kbd>
            break
        }
        return (
          <Fragment key={index}>
            {numpad && <Spacer>numpad</Spacer>}
            {toRender}
          </Fragment>
        )
      })}
    </Container>
  )
}

Shortcut.propTypes = {
  keys: PropTypes.string.isRequired,
}

const Spacer = styled.div`
  margin: 0 3px;
`

const Then = styled.div`
  font-style: italic;
  margin: 0 3px;
`

const Container = styled.div`
  display: ${props => (props.isHtml ? "block" : "inline-flex")};
  flex-wrap: wrap;
  font-size: 14px;
  color: #e9e5e5;

  kbd {
    font-size: 14px;
  }

  .kbn-or {
    padding: 1px 10px;
  }
`
