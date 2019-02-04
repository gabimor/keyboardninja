import React, { Component } from "react"
import styled from "styled-components"

import { colors } from "../../layout"
import ShortcutInput from "./ShortcutInput"
import Button from "../../../components/Button"

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
    this.shortcutInputElm.focus()
  }

  handleSubmit = e => {
    e.preventDefault()
  }

  handleSectionChange = ({ value, label }) => {
    this.setState({ section: { value, label } })
  }

  handleActionChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { action, keys, section } = this.state
    const { sections, onAdd, onCancel } = this.props
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
              causeFocus={elm => this.shortcutInputElm = elm}
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
              onChange={this.handleActionChange}
              autoComplete="off"
            />
            <label>Section</label>
            <Select
              value={section}
              onChange={this.handleSectionChange}
              options={sections}
            />
            <Button
              onClick={() => onAdd(this.state)}
              style={{ margin: "0 8px" }}
            >
              Add
            </Button>
            <Button onClick={() => onCancel()} secondary={true}>
              Cancel
            </Button>
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
