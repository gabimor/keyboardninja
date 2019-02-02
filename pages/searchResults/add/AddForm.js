import React, { Component } from "react"
import styled from "styled-components"
import { colors } from "../../layout"

import ShortcutInput from "./ShortcutInput"
import Button from "../../../components/Button"
// import { saveShortcut } from '../../api/shortcuts'

const Container = styled.form`
  background: ${colors.formBG};
  display: flex;
  align-items: center;
  padding: 10px 20px;

  & input {
    background: ${colors.formInputBG};      
  }
`

class AddForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categoryId: "",
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

    const { appId, categoryId, action, osx, comment } = this.state
    // saveShortcut(appId, categoryId, action, osx, comment)
  }

  render() {
    const { action, keys } = this.state
    return (
      <Container onSubmit={this.handleSubmit}>
        <ShortcutInput name="osx" onChange={this.handleChange} />
        <input
          type="text"
          name="categoryId"
          onChange={this.handleChange}
          autoComplete="off"
        />
        Action
        <input
          type="text"
          name="action"
          value={action}
          onChange={this.handleChange}
          autoComplete="off"
        />
        <Button>Add</Button>
        <Button secondary={true}>Cancel</Button>
      </Container>
    )
  }
}

export default AddForm
