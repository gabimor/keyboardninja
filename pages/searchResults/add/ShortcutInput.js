import React, { Component } from "react"
import styled, { keyframes } from "styled-components"
import { colors } from "../../layout"

import Shortcut from "../Shortcut"

const Container = styled.div`
  display: inline-block;
  min-width: 200px;
  vertical-align: middle;
`

const blink = keyframes`
  50% { visibility: hidden; } 
`

const Cursor = styled.div`
  border-right: solid 2px ${colors.white};
  display: inline-block;
  height: 67%;
  visibility: ${props => (props.focus ? "visible" : "hidden")};
  animation-name: ${blink};
  animation-duration: 0.6s;
  animation-timing-function: step-end;
  animation-iteration-count: infinite;
  animation-direction: alternate;
`

const Input = styled.div`
  display: inline-flex;
  width: 100%;
  align-items: center;
  background: ${colors.formInputBG};
  border: dashed 1px ${colors.panelGray};
  height: 34px;
  padding: 2px 0 1px 5px;

  :focus {
    background: ${colors.formInputFocusBG};
  }
`
function getKeyName(key) {
  const keyNames = {
    Control: "Ctrl",
    " ": "Space",
    Escape: "Esc",
    PageUp: "PgUp",
    PageDown: "PgDn",
  }

  return keyNames[key] || key
}

export default class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      keys: props.keys || [],
    }

    this.input = React.createRef()
  }

  componentDidMount() {
    this.input.current.onkeydown = this.handleKeyDown.bind(this)
    this.input.current.onblur = this.handleBlur
    this.input.current.onfocus = this.handleFocus
  }

  handleBlur = () => {
    this.setState({ focus: false })
  }

  handleFocus = () => {
    this.setState({ focus: true })
  }

  handleKeyDown(e) {
    if (e.key === "Tab") return
    e.preventDefault()

    if (e.key === "Backspace") {
      this.setState(state => {
        const keys = state.keys.slice(0, state.keys.length - 1)

        return { keys }
      })
    } else if (!this.state.keys.includes(e.key)) {
      this.setState(state => {
        const keys = [...state.keys, getKeyName(e.key)]

        return { keys }
      })
    }
  }

  render() {
    const { keys, focus } = this.state
    return (
      <Container>
        <Input tabIndex={0} ref={this.input}>
          {keys.length > 0 && <Shortcut keys={keys} />}
          <Cursor focus={focus} />
        </Input>
      </Container>
    )
  }
}
