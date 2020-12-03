import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import ContactForm from "./contactUs/ContactForm";
import { tabletBreakpoint } from "@client/consts";
import { getTitle } from "@shared/utils";

export default () => {
  const [messageSent, setMessageSent] = useState(false);
  useEffect(() => {
    document.title = getTitle("/contact");
  }, []);

  return (
    <Container>
      <div>
        <Title>
          Missing something? Have an idea?
          <TitleBold>Let us know</TitleBold>
        </Title>

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
  text-align: center;
`;

const Title = styled.h1`
  padding-bottom: 15px;
  font-size: 45px;
  line-height: 1.3em;
  margin-bottom: 40px;

  @media (max-width: ${tabletBreakpoint}px) {
    font-size: 40px;
  }
`;

const TitleBold = styled.span`
  display: block;
  font-weight: bold;
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
