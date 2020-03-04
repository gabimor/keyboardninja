import React from "react"
import { contactUs } from "../../helpers/api"
import Button from "../../components/Button"
import styled from "@emotion/styled"

export default () => {
  function handleSubmit(event) {
    event.preventDefault()
    const { name, email, message } = event.target
    contactUs(name.value, email.value, message.value)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="name">NAME</Label>
      <Input id="name" name="name" type="text" />
      <Label htmlFor="email">EMAIL</Label>
      <Input id="email" name="email" type="email" />
      <Label htmlFor="message">MESSAGE</Label>
      <Textarea id="message" name="message" rows={7}></Textarea>
      <Button
        type="submit"
        style={{ display: "block", width: "100%", padding: 12, marginTop: 25 }}
      >
        Send
      </Button>
    </Form>
  )
}

const Form = styled.form`
  text-align: left;
  margin-top: 50px;
`

const Label = styled.label`
  color: #9d8b8b;
  display: block;
  margin: 15px 0 5px 0;
`

const Input = styled.input`
  background: #e9e5e5;
  border-radius: 3px;
  display: block;
  width: 100%;
`

const Textarea = styled.textarea`
  background: #e9e5e5;
  border-radius: 3px;
  display: block;
  width: 100%;
`
