import React, { Component } from "react"
import styled from "styled-components"

import { colors } from "../../layout"
import { AddPanel } from "../../../components/Panel"
import ShortcutInput from "./ShortcutInput"
import Button from "../../../components/Button"

const Container = styled.div`
  margin-top: 12px;
  display: inline-grid;
  grid-template-areas:
    "shortcut rest"
    "advanced empty";
  grid-column-gap: 15px;
  min-width:1000px;

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
  min-width:200px;
`

const Advanced = styled.div`
  color: ${colors.panelZebra};
  grid-area: advanced;
  padding-top: 3px;
  text-decoration: underline;
  text-align: right;
  font-size: 12px;
`

class AddForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: "",
      action: "",
      keys: "",
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit(e) {
    e.preventDefault()
  }

  render() {
    const { action } = this.state
    return (
      <AddPanel onSubmit={this.handleSubmit}>
        <h3>
          Thanks for <b>contributing!</b> Here you go:
        </h3>
        <Container>
          <ShortcutContainer>
            <label>Shortcut</label>
            <ShortcutInput onChange={this.handleChange} />
          </ShortcutContainer>
          <Advanced>Advanced</Advanced>
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
            <input
              type="text"
              name="section"
              onChange={this.handleChange}
              autoComplete="off"
              style={{ marginRight: "8px" }}
            />
            <Button style={{ marginRight: "8px" }}>Add</Button>
            <Button secondary={true}>Cancel</Button>
          </RestContainer>
        </Container>
      </AddPanel>
    )
  }
}

export default AddForm
