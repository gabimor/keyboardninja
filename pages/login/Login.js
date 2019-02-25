import React, { Component } from "react"
import { Form } from "react-powerplug"
import * as EmailValidator from "email-validator"

import styled from "styled-components"

import Input from "../../components/Input"
import Button from "../../components/Button"

export default function Login({ onSubmit }) {
  return (
    <Form
      initial={{
        email: "",
        password: "",
        emailValid: true,
        passwordValid: true,
      }}
    >
      {({ field, values, setValues }) => {
        return (
          <FormContainer
            onSubmit={e => {
              e.preventDefault()

              const emailValid = EmailValidator.validate(values.email)
              const passwordValid =
                values.password && values.password.length >= 6

              setValues({ emailValid, passwordValid })

              if (emailValid && passwordValid) {
                onSubmit({
                  email: values.email,
                  password: values.password,
                })
              }
            }}
          >
            <Header>Log in</Header>
            <Label>Email</Label>
            <Input {...field("email").bind} />
            {!values.emailValid && <Error>Please enter a valid email</Error>}
            <LabelWrapper>
              <Label>Password</Label>
              <a>Forgot password ?</a>
            </LabelWrapper>
            <Input {...field("password").bind} />
            {!values.passwordValid && <Error>Please enter your password</Error>}
            <Button type="submit" style={{ marginTop: 20 }}>
              Log in
            </Button>
            <SignupWrapper>
              Don't have an account ?<a> Sign up</a>
            </SignupWrapper>
          </FormContainer>
        )
      }}
    </Form>
  )
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`

const Header = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`

const LabelWrapper = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-top: 10px;
  a {
    font-size: 13px;
  }
`

const SignupWrapper = styled.div`
  text-align: center;
  margin-top: 40px;
  color: #e9e5e5;
`

const Label = styled.label`
  color: #9d8b8b;
  font-size: 14px;
  margin-bottom: 5px;
`

const Error = styled.label`
  margin-top: 5px;
  color: #e86562;
  font-size: 14px;
`
