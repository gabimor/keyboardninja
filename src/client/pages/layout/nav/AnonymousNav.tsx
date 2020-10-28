import { DataContext } from "@client/DataContext";
import styled from "@emotion/styled";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PrimaryButton } from "../../../components/Buttons";

export default function Anonymous() {
  const store = useContext(DataContext);

  return (
    <ul>
      <li>
        <Link to="/contact">Wanna Help ?</Link>
      </li>
      <LoginWrapper>
        <OptionWrapper onClick={() => store.setLoginModalVisible(true)}>
          Log in
        </OptionWrapper>
      </LoginWrapper>
      <li>
        <Link to="/signup">
          <PrimaryButton>Sign up</PrimaryButton>
        </Link>
      </li>
    </ul>
  );
}

const LoginWrapper = styled.li`
  border-left: solid 1px #5a5a5a;
  padding-left: 15px;
`;

const OptionWrapper = styled.span`
  cursor: pointer;
`;
