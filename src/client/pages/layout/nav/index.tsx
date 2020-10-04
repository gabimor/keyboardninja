import React, { useContext } from "react";

import styled from "@emotion/styled";
import LoggedInNav from "./LoggedInNav";
import AnonymousNav from "./AnonymousNav";
import { DataContext } from "@client/DataContext";

export default () => {
  const { user } = useContext(DataContext);

  return <Container>{user ? <LoggedInNav /> : <AnonymousNav />}</Container>;
};

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
