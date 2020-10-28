import React from "react";
import styled from "@emotion/styled";
import { tabletBreakpoint } from "@client/consts";
import CloseX from "@client/components/CloseX";
import { PrimaryButton } from "../../components/Buttons";
import { Link } from "react-router-dom";

interface Props {
  onClose: () => void;
}

const signupCTAMessage = ({ onClose }: Props) => (
  <Container>
    <CloseX onClick={onClose} />

    <Title>
      “Keyboard shortcuts make the interface go away till’ all that’s left is{" "}
      <b>pure creation…</b>”
    </Title>
    <Bullets>
      <li>
        <img src="/icons/star-on.svg" /> Save your facorite keyboard shortcuts
      </li>
      <li>
        <i className="fas fa-link"></i> Share with friends
      </li>
      <li>
        <i className="fas fa-users"></i> See what everybody else is using!
      </li>
    </Bullets>
    <Link to="/signup">
      <PrimaryButton>Sign up</PrimaryButton>
    </Link>
  </Container>
);

export default signupCTAMessage;

const Container = styled.div`
  background: #324e4e;
  padding: 20px;
  font-size: 16px;
  line-height: 1.5em;
  border-radius: 5px;
  margin-bottom: 20px;
  position: relative;
  font-weight: 300;
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (min-width: ${tabletBreakpoint}px) {
    margin-top: -20px;
  }
`;

const Bullets = styled.ul`
  display: inline-block;
  padding: 20px 0;
  li {
    line-height: 1.7em;
  }

  img {
    width: 23px;
    vertical-align: top;
    position: relative;
    right: 3px;
  }

  i {
    color: #ffd766;
    font-size: 15px;
    width: 23px;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin: 0.5em 0;
  font-size: 20px;
`;
