import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import ContactForm from "./contact/ContactForm";
import { getTitle } from "@shared/utils";

export default () => {
  const [messageSent, setMessageSent] = useState(false);
  useEffect(() => {
    document.title = getTitle("/contact");
  }, []);

  return (
    <Container>
      <InnerContainer>
        <Title>About</Title>
        <p>There’s a line I read somewhere:</p>
        <p>
          “Keyboard shortcuts make the UI disappear until all that’s left is
          pure creation” It stuck.
        </p>
        <p>
          KeyboardNinja.me is my geeky attempt to document all those shortcuts,
          display them beautifully and help you remember and use them.
          <br /> You can save your favorite shortcuts for future reference,
          share them with friends and see what others are using.
        </p>
        <Title>Missing Your App?</Title>
        <p style={{ marginBottom: 0 }}>
          Wanna see your favorite app in here? missing a feature? found a bug?
          <br />
          <br />
          Let me know:
        </p>
        {!messageSent ? (
          <ContactForm onSend={() => setMessageSent(true)} />
        ) : (
          <div>
            <Title>Thank You!</Title>
            Your message was sent successfully
          </div>
        )}
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 300;
  background: #2c252599;
  padding: 20px 10px 0 10px;
  border-radius: 7px;
  min-height: calc(100vh - 90px);

  p {
    font-size: 1.1em;
  }
`;

const InnerContainer = styled.div`
  max-width: 600px;
  color: #e9e5e5;
`;

const Title = styled.h1`
  padding: 35px 0 15px;
  font-size: 25px;
  text-align: center;
  font-weight: 400;
  color: #e9e5e5;
`;
