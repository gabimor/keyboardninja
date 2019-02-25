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
        <Header>Log in</Header>
        <Label>Email</Label>
        <Input />
        <LabelWrapper>
          <Label>Password</Label>
          <a>Forgot password ?</a>
        </LabelWrapper>
        <Input />
        <Button>Log in</Button>
        <SignupWrapper>
          Don't have an account ?<a> Sign up</a>
        </SignupWrapper>
      </Contianer>
    )
  }
}

const Contianer = styled.div`
  display: flex;
  flex-direction: column;
  input {
    margin-bottom: 20px;
  }
`

const Header = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`

const LabelWrapper = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;

  a {
    font-size: 13px;
  }
`

const SignupWrapper = styled.div`
  text-align: center;
  margin-top: 40px;
  color: #E9E5E5;
`

const Label = styled.label`
  color: #9d8b8b;
  font-size: 14px;
  margin-bottom: 5px;
`
