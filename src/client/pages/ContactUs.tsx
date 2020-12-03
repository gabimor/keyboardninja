import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import ContactForm from "./contactUs/ContactForm";
import { getTitle } from "@shared/utils";

export default () => {
  const [messageSent, setMessageSent] = useState(false);
  useEffect(() => {
    document.title = getTitle("/contact");
  }, []);

  return (
    <Container>
      <div style={{ minWidth: 500 }}>
        <Title>About</Title>
        <Text>
          Which app should I add next? <br /> Which feature would be cool ?
          <br /> Found a bug ?<b> Let me know!</b>
        </Text>
        {!messageSent ? (
          <ContactForm onSend={() => setMessageSent(true)} />
        ) : (
          <ThankYou>
            <h2>Thank You!</h2>
            <span>Your message was sent successfully</span>
          </ThankYou>
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
  font-weight: 300;
`;

const Title = styled.h1`
  padding-bottom: 15px;
  font-size: 25px;
  font-weight: 300;
`;

const Text = styled.div`
  text-align: left;
`;

const ThankYou = styled.div`
  color: #d1d0d4;
  margin: auto;
  padding: 40px;
  text-align: center;
  width: 320px;
  h2 {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 20px;
  }
`;
