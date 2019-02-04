import React, { Component } from "react"
import styled, { keyframes } from "styled-components"
import { colors } from "../../layout"

import Shortcut from "../Shortcut"

function getKeyName(key) {
  const keyNames = {
    Control: "ctrl",
    " ": "space",
    "+": "plus",
    Escape: "esc",
    PageUp: "pgup",
    PageDown: "pgdn",
  }

  return keyNames[key] || key.toLowerCase()
}

export default class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      keys: props.keys || [],
    }

    this.input = React.createRef()
    
  }

  componentWillReceiveProps({ keys }) {
    this.setState({ keys })
  }

  componentDidMount() {
    const inputElm = this.input.current

    inputElm.onkeydown = this.handleKeyDown.bind(this)
    inputElm.onblur = this.handleBlur
    inputElm.onfocus = this.handleFocus
    this.props.causeFocus(inputElm)
  }

  handleBlur = () => {
    this.setState({ focus: false })
  }

  handleFocus = () => {
    this.setState({ focus: true })
  }

  addKey(key) {
    if (!this.state.keys.includes(key.toLowerCase())) {
      this.setState(state => {
        const keys = [...state.keys, key]
        this.props.onChange(keys)
        return { keys }
      })
    }
  }

  deleteKey() {
    this.setState(state => {
      const keys = state.keys.slice(0, state.keys.length - 1)
      this.props.onChange(keys)
      return { keys }
    })
  }

  handleKeyDown(e) {
    const key = getKeyName(e.key)

    if (key === "tab") return
    e.preventDefault()

    if (key === "backspace") {
      this.deleteKey()
    } else {
      this.addKey(key)
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

const Container = styled.div`
  flex-grow: 1;
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
  padding: 2px 7px 1px 7px;

  :focus {
    background: ${colors.formInputFocusBG};
  }
`
