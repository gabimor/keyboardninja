import React, { Component } from "react"

import styled from "styled-components"

import Input from "../../components/Input"
import Button from "../../components/Button"

export default class extends Component {
  state = { email: "", password: "" }

  constructor() {
    super()
  }

  render() {
    const { email, password } = this.state
    return (
      <Contianer>
        <Label>Email</Label>
        <Input />
        <Label>Password</Label>
        <Input />
        <Button>Log in</Button>
      </Contianer>
    )
  }
}

const Contianer = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  color: #5a5a5a;
`
