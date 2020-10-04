import React from "react";

import styled from "@emotion/styled";
import LoggedIn from "./LoggedInNav";
import Anonymous from "./AnonymousNav";
import { LoggedInProps } from "./LoggedInNav";

export default (props: LoggedInProps) => (
  <Container>{props.user ? <LoggedIn {...props} /> : <Anonymous />}</Container>
);

const Container = styled.div`
  font-size: 14px;
  font-weight: 300;

  margin-left: auto;

  ul {
    display: inline-block;
    list-style: none;
  }

  li {
    padding-left: 20px;
    display: inline-block;
  }

  a {
    color: #ffffff;
  }
`;
