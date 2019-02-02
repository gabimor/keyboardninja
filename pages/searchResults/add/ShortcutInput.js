import React, { Component } from "react"
import styled from "styled-components"
import { colors } from "../../layout"

import Shortcut from "../Shortcut"

const Cursor = styled.div`
  border-right: solid 1px ${colors.white};
  display: inline-block;
  height: 22px;
`

const Input = styled.div`
  background: ${colors.formInputBG};
  border: dashed 1px ${colors.panelGray};
  width: 200px;
  height: 30px;
  padding: 3px 0 3px 5px;

  :focus {
    outline: 0;
  }
`

// const LONG_PRESS_DURATION = 600

export default class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: [],
    }

    this.input = React.createRef()
  }

  componentDidMount() {
    this.input.current.onkeyup = this.handleKeyUp.bind(this)
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

  // handleLongPress(key) {
  //   if (key === "Backspace") {
  //     this.lastIsLong = true
  //   }
  //   // } else if (key === "Tab") {
  //   //   this.input.current.blur()
  //   // }
  // }

  handleKeyDown(e) {
    e.preventDefault()
    if (e.key === "Tab") return

    if (e.key === "Backspace") {
      this.setState(state => {
        const value = state.value.slice(0, state.value.length - 1)

        return { value }
      })
    } else if (!this.state.value.includes(e.key)) {
      this.setState(state => {
        const value = [...state.value, e.key]

        return { value }
      })
    }

    // e.preventDefault()
    // if (e.key !== this.lastKeyDown) {
    //   this.longPressTimoutId = setTimeout(
    //     () => this.handleLongPress(e.key),
    //     LONG_PRESS_DURATION
    //   )
    //   this.lastKeyDown = e.key
    // }
  }

  handleKeyUp(e) {
    // if (this.lastIsLong) return
    // if (e.key === "Tab") {
    //   this.input.current.blur()
    // } else if (e.key === "Backspace") {
    //   this.setState(state => {
    //     const value = state.value.slice(0, state.value.length - 1)
    //     return { value }
    //   })
    // } else {
    //   this.setState(state => {
    //     const value = [...state.value, this.getKeyName(e.key)]
    //     return { value }
    //   })
    // }
    // clearTimeout(this.longPressTimoutId)
    // this.lastKeyDown = undefined
    // this.lastIsLong = false
  }

  render() {
    const { value, focus } = this.state
    return (
      <Input tabIndex={0} ref={this.input}>
        <Shortcut keys={value} />
        {focus && <Cursor />}
      </Input>
    )
  }
}
