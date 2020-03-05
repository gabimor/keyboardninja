import React, { useState } from "react" // eslint-disable-line no-unused-vars
import styled from "@emotion/styled"
import ContactForm from "./contactUs/ContactForm"

export default () => {
  const [messageSent, setMessageSent] = useState(false)

  const onSend = () => setMessageSent(true)

  return (
    <Container>
      <div>
        <Header>Calling all shortcuts geeks</Header>
        <Subtitle>
          Join the effort do document every shortcut out there!
        </Subtitle>
        Missing your favorite app ? your favorite shortcut ? noticed a mistake ?
        here's how you can help: 1.
        {!messageSent ? (
          <ContactForm onSend={onSend} />
        ) : (
          <ThankYou>
            <h2>Thank You!</h2>
            Promise to get back to you ASAP
          </ThankYou>
        )}
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
  text-align: center;
`

const Header = styled.h1`
  font-weight: bold;
  padding-bottom: 15px;
`

const ThankYou = styled.div`
  padding: 40px;
  text-align: center;
`

const Subtitle = styled.h2``
