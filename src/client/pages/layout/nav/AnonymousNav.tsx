import { DataContext } from "@client/DataContext";
import styled from "@emotion/styled";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PrimaryButton } from "../../../components/Buttons";
import { enterMobileBreakpoint } from "@client/consts";

export default function Anonymous() {
  const store = useContext(DataContext);

  return (
    <ul>
      <ContactWrapper>
        <Link to="/contact">Wanna Help ?</Link>
      </ContactWrapper>
      <li>
        <OptionWrapper onClick={() => store.setLoginModalVisible(true)}>
          Log in
        </OptionWrapper>
      </li>
      <li>
        <Link to="/signup">
          <PrimaryButton>Sign up</PrimaryButton>
        </Link>
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
