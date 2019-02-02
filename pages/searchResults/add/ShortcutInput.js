import React, { Component } from "react"
import styled from "styled-components"
import { colors } from "../../layout"

import Shortcut from "../Shortcut"

const Cursor = styled.div`
  border-right: solid 1px ${colors.white};
  display:inline-block;
  height: 22px;
`

const Input = styled.div`
  background: ${colors.formInputBG};
  border: dashed 1px ${colors.panelGray};
  width: 200px;
  padding: 3px 0 3px 5px;

  :focus {
    outline: 0;
  }
`

const LONG_PRESS_DURATION = 600

export default class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: "",
    }

    this.input = React.createRef()

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.input.current.onkeyup = this.handleKeyUp.bind(this)
    this.input.current.onkeydown = this.handleKeyDown.bind(this)
    this.input.current.onfocus = () => this.setState({ value: "" })
  }

  getKeyName(key) {
    const keyNames = {
      Control: "Ctrl",
      " ": "Space",
      Escape: "Esc",
    }

    return keyNames[key] || key
  }

  handleLongPress(key) {
    if (key === "Escape") {
      this.setState({ value: "" })
      this.lastIsLong = true
    } else if (key === "Enter") {
      this.input.current.blur()
    }
  }

  handleKeyDown(e) {
    e.preventDefault()
    if (e.key !== this.lastKeyDown) {
      this.longPressTimoutId = setTimeout(
        () => this.handleLongPress(e.key),
        LONG_PRESS_DURATION
      )
      this.lastKeyDown = e.key
    }
  }

  handleKeyUp(e) {
    e.preventDefault()
    if (!this.lastIsLong) {
      this.setState(state => {
        const addPlus = state.value.slice(-1) !== " " && state.value !== ""
        let value = state.value
        if (addPlus) value += "+"
        value += this.getKeyName(e.key)

        return { value }
      })
    }

    clearTimeout(this.longPressTimoutId)
    this.lastKeyDown = undefined
    this.lastIsLong = false
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
    })
  }

  render() {
    const { value } = this.state

    return (
      <Input tabIndex={0} ref={this.input} onChange={this.handleChange}>
        {value && <Shortcut keys={value} />}<Cursor/>
      </Input>
    )
  }
}
