import React, { useState } from "react";
import { contactUs } from "../../api";
import { PrimaryButton } from "../../components/Buttons";
import styled from "@emotion/styled";
import TextInput from "@client/components/TextInput";
import TextArea from "@client/components/TextArea";
import FormLabel from "@client/components/FormLabel";

interface Props {
  onSend: () => void;
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
      onSend();
    } catch (e) {
      alert(e.toString());
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormTop>
        <div style={{ marginRight: 5 }}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <TextInput
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
        </div>
        <div style={{ marginLeft: 5 }}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextInput
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>
      </FormTop>
      <FormLabel htmlFor="message">Message</FormLabel>
      <TextArea
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={7}
        placeholder="How can we help?"
      ></TextArea>
      <PrimaryButton
        style={{ display: "block", width: "100%", padding: 12, marginTop: 25 }}
      >
        Send
      </PrimaryButton>
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
