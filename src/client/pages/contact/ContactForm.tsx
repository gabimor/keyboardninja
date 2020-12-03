import React, { useState } from "react";
import { contact } from "../../api";
import { PrimaryButton } from "../../components/Buttons";
import styled from "@emotion/styled";
import { TextInput, TextArea } from "@client/components/TextInput";
import FormLabel from "@client/components/FormLabel";
import { ClipLoader } from "react-spinners";

interface Props {
  onSend: () => void;
}

export default ({ onSend }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSumbitting, setIsSumbitting] = useState(false);

  async function handleSubmit() {
    event.preventDefault();

    try {
      setIsSumbitting(true);
      await contact(name, email, message);
      setName("");
      setEmail("");
      setMessage("");
      onSend();
    } catch (e) {
      setIsSumbitting(false);
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
        placeholder="Aop request, feature request, bug request, or any kind of request "
      ></TextArea>
      <ButtonContainer>
        <StyledPrimaryButton>
          Send <ClipLoader size={10} color={"#fff"} loading={isSumbitting} />
        </StyledPrimaryButton>
      </ButtonContainer>
    </Form>
  );
};

const ButtonContainer = styled.div`
  text-align: right;
`;

const StyledPrimaryButton = styled(PrimaryButton)`
  margin-top: 25px;
  width: 100px;
`;

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
