import React from "react" // eslint-disable-line no-unused-vars
import styled from "@emotion/styled"

const FirstTimeMessage = ({ onDismiss }) => (
  <Container>
    <b>Welcome!</b> Here's a few things to try here: <br />
    <TextWrapper>
      <ul>
        <li>
          - Browse and <Highlight>pin</Highlight> your favorite shortcuts
        </li>
        <li>
          - Hit <Highlight>Get Link</Highlight> and share your selection with
          friends
        </li>
      </ul>
    </TextWrapper>
    <Dismiss onClick={onDismiss}>&times;</Dismiss>
  </Container>
)

export default FirstTimeMessage

const Container = styled.div`
  background: #742f2d;
  padding: 20px;
  line-height: 1.5em;
  border-radius: 5px;
  margin-bottom: 20px;
  width: calc(50% - 15px);
  position: relative;
  font-weight: 300;

  @media (max-width: 1122px) {
    width: 100%;
  }

  @media (min-width: 768px) {
    margin-top: -20px;
  }
`
const TextWrapper = styled.div`
  margin: 0.5em 0;
`

const Dismiss = styled.span`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 5px;
  font-size: 22px;
  font-weight: 200;
  color: #e9e5e5;
`

const Highlight = styled.span`
  color: #ffe6ab;
`
