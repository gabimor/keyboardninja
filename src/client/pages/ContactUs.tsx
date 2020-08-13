import React, { useState } from "react" // eslint-disable-line no-unused-vars
import styled from "@emotion/styled"
import ContactForm from "./contactUs/ContactForm"

export default () => {
  const [messageSent, setMessageSent] = useState(false)
  const [error, setError] = useState()

  const onSend = err => {
    if (err) {
      setError("Sorry... something went wrong. Please try again later")
    } else {
      setError()
      setMessageSent(true)
    }
  }
  return (
    <Container>
      <div>
        <Title>
          Missing something? Have an idea?
          <TitleBold>Let us know</TitleBold>
        </Title>

        {!messageSent ? (
          <ContactForm onSend={onSend} />
        ) : (
          <ThankYou>
            <h2>Thank You!</h2>
            <span>Promise to get back to you ASAP</span>
          </ThankYou>
        )}
        {error && <Error>{error}</Error>}
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

const Title = styled.h1`
  padding-bottom: 15px;
  font-size: 45px;
  line-height: 1.3em;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 40px;
  }
`

const TitleBold = styled.span`
  display: block;
  font-weight: bold;
`

const Text = styled.div`
  padding: 65px 0 20px 0;
  font-size: 16px;
  text-align: left;
  color: #e9e5e5;
`

const Error = styled.div`
  padding-top: 10px;
  font-size: 16px;
  text-align: left;
  color: #d1403d;
`

const ThankYou = styled.div`
  border-top: solid 1px #4f4242;
  color: #d1d0d4;
  margin: auto;
  padding: 40px;
  text-align: center;
  width: 300px;
  h2 {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 20px;
  }
`