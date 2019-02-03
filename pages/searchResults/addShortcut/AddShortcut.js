import React, { Component } from "react"
import styled from "styled-components"

import Select from "react-select"
import { colors } from "../../layout"
import ShortcutInput from "./ShortcutInput"
import Button from "../../../components/Button"

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
]

const colourStyles = {
  control: (styles, state) => ({
    ...styles,
    borderRadius: 0,
    backgroundColor: state.isFocused
      ? colors.formInputFocusBG
      : colors.formInputBG,
    border: 0,
    color: colors.white,
    boxShadow: "none",
    minHeight: 0,
  }),
  container: styles => ({
    ...styles,
    display: "inline-block",
    width: "250px",
  }),
  dropdownIndicator: styles => ({
    ...styles,
    color: colors.lightGray,
    padding: "8px 4px 7px",
  }),
  placeholder: styles => ({
    ...styles,
    color: colors.lightGray,
  }),
  input: styles => ({
    ...styles,
    color: colors.white,
  }),
  singleValue: styles => ({
    ...styles,
    color: colors.white,    
  }),
  option: (styles, state) => {
    return {
      ...styles,
      background: state.isFocused ? "#c3c3c3" : colors.formInputFocusBG ,
    }
  },
  menu: styles => ({
    ...styles,
    backgroundColor: colors.formInputFocusBG,
    borderRadius: 0,
  }),
  menuList: styles => ({
    ...styles,
    padding:0
  }),
}
class AddShortcut extends Component {
  constructor({ keys, action, section, category }) {
    super()
    this.state = {
      category,
      action,
      section,
      keys,
    }
  }

  handleKeysChange = keys => {
    this.setState({
      keys,
    })
  }

  handleAddKey = key => {
    if (!this.state.keys.includes(key)) {
      this.setState(state => ({ keys: [...state.keys, key] }))
    }
  }

  handleSubmit = e => {
    e.preventDefault()
  }

  render() {
    const { action, keys, section, category } = this.state
    return (
      <Container onSubmit={this.handleSubmit}>
        <h3>
          Thanks for <b>contributing!</b> Here you go:
        </h3>
        <InnerContainer>
          <ShortcutContainer>
            <label>Shortcut</label>
            <ShortcutInput
              name="keys"
              onChange={this.handleKeysChange}
              keys={keys}
            />
          </ShortcutContainer>
          <Advanced>
            <span onClick={() => this.handleAddKey("tab")}>Add Tab</span> |{" "}
            <span onClick={() => this.handleAddKey("BackSpace")}>
              BackSpace
            </span>
          </Advanced>
          <RestContainer>
            <label>Action</label>
            <input
              type="text"
              name="action"
              value={action}
              onChange={this.handleChange}
              autoComplete="off"
            />
            <label>Section</label>
            <Select
              name="section"
              value={section}
              onChange={this.handleChange}
              options={options}
              styles={colourStyles}
            />
            <Button style={{ margin: "0 8px" }}>Add</Button>
            <Button secondary={true}>Cancel</Button>
          </RestContainer>
        </InnerContainer>
      </Container>
    )
  }
}

export default AddShortcut

const Container = styled.div`
  padding: 16px 30px 3px 30px;
  margin-bottom: 30px;
  background: ${colors.formBG};
`

const InnerContainer = styled.div`
  margin-top: 12px;
  display: inline-grid;
  grid-template-areas:
    "shortcut rest"
    "advanced empty";
  grid-column-gap: 15px;
  min-width: 1000px;

  & input:focus,
  & textarea:focus,
  & select:focus {
    background: #afadad;
  }
`

const RestContainer = styled.div`
  grid-area: rest;

  & input {
    margin-right: 15px;
  }
`

const ShortcutContainer = styled.div`
  grid-area: shortcut;
  display: inline-flex;
  align-items: center;
  min-width: 200px;
`

const Advanced = styled.div`
  color: ${colors.panelZebra};
  grid-area: advanced;
  padding-top: 3px;
  text-align: right;
  font-size: 12px;
`
