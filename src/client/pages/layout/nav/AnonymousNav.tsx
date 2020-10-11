import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";
import { PrimaryButton } from "../../../components/Buttons";

export default function Anonymous() {
  return (
    <ul>
      <li>
        <Link to="/contact">Wanna Help ?</Link>
      </li>
      <LoginWrapper>
        <Link to="/login">Log in</Link>
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
