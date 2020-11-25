import { DataContext } from "@client/DataContext";
import styled from "@emotion/styled";
import React, { useContext } from "react";
import { PrimaryButton } from "../../../components/Buttons";
import { LoginModalState } from "@client/store";

export default function Anonymous() {
  const store = useContext(DataContext);

  return (
    <>
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
    </>
  );
}

const OptionWrapper = styled.span`
  cursor: pointer;
`;

