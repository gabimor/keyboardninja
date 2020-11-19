import { DataContext } from "@client/DataContext";
import styled from "@emotion/styled";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PrimaryButton } from "../../../components/Buttons";
import { enterMobileBreakpoint } from "@client/consts";
import { LoginModalState } from "@client/store";

export default function Anonymous() {
  const store = useContext(DataContext);

  return (
    <ul>
      <ContactWrapper>
        <Link to="/about">About</Link>
      </ContactWrapper>
      <li>
        <OptionWrapper
          onClick={() => store.setLoginModalState(LoginModalState.Login)}
        >
          Log in
        </OptionWrapper>
      </li>
      <li>
        <OptionWrapper
          onClick={() => store.setLoginModalState(LoginModalState.Signup)}
        >
          <PrimaryButton>Sign up</PrimaryButton>
        </OptionWrapper>
      </li>
    </ul>
  );
}

const OptionWrapper = styled.span`
  cursor: pointer;
`;

const ContactWrapper = styled.li`
  padding-right: 15px;
  border-right: solid 1px #5a5a5a;
  @media (max-width: ${enterMobileBreakpoint + 40}px) {
    display: none !important;
  }
`;
