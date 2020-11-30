import React, { useContext } from "react";

import styled from "@emotion/styled";
import LoggedInNav from "./LoggedInNav";
import AnonymousNav from "./AnonymousNav";
import { DataContext } from "@client/DataContext";
import { Link } from "react-router-dom";
import { enterMobileBreakpoint } from "@client/consts";

export default () => {
  const { user } = useContext(DataContext);

  return (
    <Container>
      <ul>
        <OptionHelpWrapper>
          <Link to="/addanapp">Add an App</Link>
        </OptionHelpWrapper>

        {user ? <LoggedInNav /> : <AnonymousNav />}
      </ul>
    </Container>
  );

};

const Container = styled.div`
  font-size: 14px;
  font-weight: 300;
  min-height: 40px;
  margin-left: auto;

  > ul {
    display: inline-block;
    list-style: none;

    > li {
      display: inline-block;
      margin-left: 15px;
    }
  }

  a {
    color: #ffffff;
  }
`;

const OptionHelpWrapper = styled.li`
  padding-right: 15px;
  border-right: solid 1px #8a8a8a;
  @media (max-width: ${enterMobileBreakpoint + 40}px) {
    display: none !important;
  }
`;
