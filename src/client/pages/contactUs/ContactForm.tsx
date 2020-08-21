import React, { useState } from "react";
import { contactUs } from "../../api";
import Button from "../../components/Button";
import styled from "@emotion/styled";

interface Props {
  onSend: (error: Error) => void;
}

export default ({ onSend }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit() {
    event.preventDefault();

    try {
      await contactUs(name, email, message);
      setName("");
      setEmail("");
      setMessage("");
      onSend(undefined);
    } catch (e) {
      onSend(e);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormTop>
        <div style={{ marginRight: 5 }}>
          <Label htmlFor="name">NAME</Label>
          <Input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
        </div>
        <div style={{ marginLeft: 5 }}>
          <Label htmlFor="email">EMAIL</Label>
          <Input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>
      </FormTop>
      <Label htmlFor="message">MESSAGE</Label>
      <Textarea
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={7}
        placeholder="How can we help?"
      ></Textarea>
      <Button
        style={{ display: "block", width: "100%", padding: 12, marginTop: 25 }}
      >
        Send
      </Button>
    </Form>
  );
};

const FormTop = styled.div`
  display: flex;
  margin-bottom: 18px;
  div {
    flex-grow: 1;
  }
`;

const Form = styled.form`
  text-align: left;
`;

const Label = styled.label`
  color: #9d8b8b;
  display: block;
  margin: 15px 0 5px 0;
`;

const Input = styled.input`
  color: #e9e5e5;
  background: #211c1c;
  border-radius: 3px;
  display: block;
  width: 100%;
`;

const Textarea = styled.textarea`
  color: #e9e5e5;
  background: #211c1c;
  border-radius: 3px;
  display: block;
  width: 100%;
  padding: 8px 10px;
`;
